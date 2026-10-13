import React, { useEffect, useRef, useState } from "react";
import { Canvas, FabricImage, FabricText, Group } from "fabric";
import QRCode from "qrcode";
import { Upload, Archive, Type } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useTheme } from "../context/ThemeContext";

const CertificateEditor = ({ selectedParticipants, selectedTemplate }) => {
  const { theme, isDarkMode } = useTheme();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);

  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [qrGroupObject, setQrGroupObject] = useState(null); // Objek Group (QR + Logo)
  const [nameObject, setNameObject] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Path ke file logo Anda (misal ditaruh di folder public/logo.png atau ikon Senkom)
  const LOGO_URL = "/logo_senkomm.png";

  // Helper Format Nama: CALLSIGN - NAMA
  const formatParticipantName = (participant) => {
    if (!participant) return "S12IQS - Ainur Rofiq";
    if (participant.CALLSIGN && participant.CALLSIGN.trim() !== "") {
      return `${participant.CALLSIGN} - ${participant.NAMA || ""}`;
    }
    return participant.NAMA || "";
  };

  // Helper Pembuat URL QR Code
  const generateParticipantUrl = (participant) => {
    const basePath = selectedTemplate?.url || "/hari-lahir-pancasila/";
    const baseUrl = `${window.location.origin}${basePath}`;

    const queryParams = new URLSearchParams({
      tahun: "2026",
      ...(participant.CALLSIGN && { callsign: participant.CALLSIGN }),
      nama: participant.NAMA || "",
      kota: participant["KOTA/ KABUPATEN"] || "",
      provinsi: participant.PROVINSI || "",
      keterangan: participant.keterangan || "",
    }).toString();

    return `${baseUrl}?${queryParams}`;
  };

  // 1. Inisialisasi Canvas
  useEffect(() => {
    const initCanvas = new Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: isDarkMode ? "#1e293b" : "#f1f5f9",
    });

    setFabricCanvas(initCanvas);

    return () => {
      initCanvas.dispose();
    };
  }, []);

  // Update Background Tema
  useEffect(() => {
    if (fabricCanvas && !imageUploaded) {
      fabricCanvas.backgroundColor = isDarkMode ? "#1e293b" : "#f1f5f9";
      fabricCanvas.renderAll();
    }
  }, [isDarkMode, fabricCanvas, imageUploaded]);

  // 2. Unggah Gambar Desain Sertifikat
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !fabricCanvas || !containerRef.current) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const imgObj = await FabricImage.fromURL(event.target.result);

        const containerWidth = containerRef.current.clientWidth;
        const scale = containerWidth / imgObj.width;
        const displayHeight = imgObj.height * scale;

        fabricCanvas.setDimensions({
          width: containerWidth,
          height: displayHeight,
        });

        imgObj.set({
          originX: "left",
          originY: "top",
          left: 0,
          top: 0,
          scaleX: containerWidth / imgObj.width,
          scaleY: displayHeight / imgObj.height,
          selectable: false,
          evented: false,
        });

        fabricCanvas.backgroundImage = imgObj;
        fabricCanvas.renderAll();
        setImageUploaded(true);

        // Tambahkan QR Code (+Logo) & Nama Sampel Pertama
        if (selectedParticipants.length > 0) {
          const sampleParticipant = selectedParticipants[0];
          const sampleUrl = generateParticipantUrl(sampleParticipant);
          const sampleText = formatParticipantName(sampleParticipant);

          await addQRCodeWithLogoToCanvas(
            sampleUrl,
            fabricCanvas,
            containerWidth,
            displayHeight,
          );
          addNameToCanvas(
            sampleText,
            fabricCanvas,
            containerWidth,
            displayHeight,
          );
        }
      } catch (err) {
        console.error("Error memuat gambar:", err);
      }
    };
    reader.readAsDataURL(file);
  };

  // Helper Membuat Elemen Group QR Code + Logo Tepat di Tengah (Proporsional)
  const createQRGroup = async (url, targetWidth = 250) => {
    // 1. Generate Gambar QR Code Dasar dengan koreksi error High ('H')
    const qrDataUrl = await QRCode.toDataURL(url || window.location.href, {
      width: targetWidth,
      margin: 1,
      errorCorrectionLevel: "H", // Wajib High agar QR tetap terbaca meski ada logo
    });

    const qrImg = await FabricImage.fromURL(qrDataUrl);
    qrImg.set({
      originX: "left",
      originY: "top",
      left: 0,
      top: 0,
    });

    const groupItems = [qrImg];

    // 2. Tambahkan Logo Tepat di Tengah Tanpa Gepeng (Preserve Aspect Ratio)
    try {
      const logoImg = await FabricImage.fromURL(LOGO_URL);

      // Tentukan target ukuran maksimal logo (misal: 25% dari total lebar QR Code)
      const maxLogoSize = targetWidth * 0.25;

      // Hitung skala tunggal berdasarkan dimensi logo terbesar agar aspek rasio terjaga sempurna
      const scale = maxLogoSize / Math.max(logoImg.width, logoImg.height);

      logoImg.set({
        originX: "center",
        originY: "center",
        left: targetWidth / 2, // Posisi persis di titik tengah X
        top: targetWidth / 2, // Posisi persis di titik tengah Y
        scaleX: scale, // Skala seragam untuk lebar
        scaleY: scale, // Skala seragam untuk tinggi (tidak gepeng)
      });

      groupItems.push(logoImg);
    } catch (e) {
      console.warn("Logo gagal dimuat, QR Code dibuat tanpa logo.", e);
    }

    // 3. Gabungkan QR Code & Logo menjadi satu Group
    const qrGroup = new Group(groupItems, {
      originX: "center",
      originY: "center",
      cornerColor: "#2563eb",
      cornerStyle: "circle",
      transparentCorners: false,
      cornerSize: 12,
    });

    return qrGroup;
  };

  // 4. Pasang QR Code + Logo ke Canvas
  const addQRCodeWithLogoToCanvas = async (url, canvas, width, height) => {
    try {
      if (qrGroupObject) {
        canvas.remove(qrGroupObject);
      }

      const qrGroup = await createQRGroup(url, 250);

      qrGroup.set({
        left: (width || canvas.width) / 2,
        top: (height || canvas.height) / 2 + 80,
      });

      canvas.add(qrGroup);
      canvas.renderAll();
      setQrGroupObject(qrGroup);
      return qrGroup;
    } catch (err) {
      console.error("Gagal membuat QR Code ber-logo:", err);
    }
  };

  // 5. Tambah / Atur Teks Nama Peserta
  const addNameToCanvas = (nameText, canvas, width, height) => {
    if (nameObject) {
      canvas.remove(nameObject);
    }

    const text = new FabricText(nameText, {
      left: (width || canvas.width) / 2,
      top: (height || canvas.height) / 2 - 80,
      originX: "center",
      originY: "center",
      fontSize: 32,
      fontWeight: "bold",
      fill: "#0f172a",
      fontFamily: "sans-serif",
      cornerColor: "#10b981",
      cornerStyle: "circle",
      transparentCorners: false,
      cornerSize: 12,
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    setNameObject(text);
    return text;
  };

  // 6. Download Massal ke File .ZIP
  const handleDownloadZip = async () => {
    if (!fabricCanvas || selectedParticipants.length === 0) return;

    setIsProcessing(true);
    setProgress(0);

    const zip = new JSZip();

    // Catat posisi & skala Group QR Code saat ini
    const qrGroupPosition = qrGroupObject
      ? {
          left: qrGroupObject.left,
          top: qrGroupObject.top,
          scaleX: qrGroupObject.scaleX,
          scaleY: qrGroupObject.scaleY,
        }
      : null;

    // Catat posisi & gaya Teks Nama saat ini
    const namePosition = nameObject
      ? {
          left: nameObject.left,
          top: nameObject.top,
          scaleX: nameObject.scaleX,
          scaleY: nameObject.scaleY,
          fontSize: nameObject.fontSize,
          fill: nameObject.fill,
          fontWeight: nameObject.fontWeight,
          fontFamily: nameObject.fontFamily,
        }
      : null;

    const bgImg = fabricCanvas.backgroundImage;
    const multiplier = bgImg ? bgImg.width / (bgImg.scaleX * bgImg.width) : 1;

    let currentQrGroup = qrGroupObject;
    let currentName = nameObject;

    for (let i = 0; i < selectedParticipants.length; i++) {
      const participant = selectedParticipants[i];
      const targetUrl = generateParticipantUrl(participant);
      const formattedText = formatParticipantName(participant);

      // --- A. UPDATE TEKS NAMA PESERTA ---
      if (currentName) {
        fabricCanvas.remove(currentName);
      }

      if (namePosition) {
        currentName = new FabricText(formattedText, {
          originX: "center",
          originY: "center",
          ...namePosition,
          selectable: false,
        });
        fabricCanvas.add(currentName);
      }

      // --- B. UPDATE QR CODE BER-LOGO ---
      if (currentQrGroup) {
        fabricCanvas.remove(currentQrGroup);
      }

      if (targetUrl && qrGroupPosition) {
        const newQrGroup = await createQRGroup(targetUrl, 250);
        newQrGroup.set({
          ...qrGroupPosition,
          selectable: false,
        });
        fabricCanvas.add(newQrGroup);
        currentQrGroup = newQrGroup;
      }

      // Render ulang Canvas bersih
      fabricCanvas.discardActiveObject();
      fabricCanvas.renderAll();

      // Export ke Format JPG
      const dataURL = fabricCanvas.toDataURL({
        format: "jpeg",
        quality: 0.95,
        multiplier: multiplier,
      });

      const base64Data = dataURL.replace(/^data:image\/jpeg;base64,/, "");
      const fileName =
        participant.CALLSIGN || participant.NAMA || `Sertifikat_${i + 1}`;

      // Simpan ke direktori ZIP
      zip.file(
        `Sertifikat_${fileName.replace(/[/\\?%*:|"<>]/g, "_")}.jpg`,
        base64Data,
        { base64: true },
      );

      setProgress(i + 1);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    // Simpan State Objek Terakhir
    setQrGroupObject(currentQrGroup);
    setNameObject(currentName);

    // Ekstrak & Unduh ZIP
    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, `E-Sertifikat_Batch_${Date.now()}.zip`);

    setIsProcessing(false);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <div
        style={{
          marginBottom: "15px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Tombol Unggah / Ganti Desain */}
        <label
          style={{
            padding: "10px 16px",
            backgroundColor: "#2563eb",
            color: "#fff",
            borderRadius: "6px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "500",
          }}
        >
          <Upload size={18} />{" "}
          {imageUploaded
            ? "Ganti Desain (JPG)"
            : "Unggah Desain Sertifikat (JPG)"}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </label>

        {/* Tombol Download All ZIP */}
        {imageUploaded && (
          <button
            onClick={handleDownloadZip}
            disabled={isProcessing}
            style={{
              padding: "10px 16px",
              backgroundColor: isProcessing ? "#9ca3af" : "#10b981",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: isProcessing ? "not-allowed" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "500",
            }}
          >
            <Archive size={18} />
            {isProcessing
              ? `Mengekstrak (${progress}/${selectedParticipants.length})...`
              : `Download All (${selectedParticipants.length} Data) .ZIP`}
          </button>
        )}
      </div>

      <p style={{ fontSize: "14px", color: theme.textSecondary }}>
        * Geser dan posisikan <strong>Teks Callsign & Nama Peserta</strong>{" "}
        (kotak hijau) serta <strong>QR Code</strong> (kotak biru) di atas desain
        sertifikat Anda.
      </p>

      {/* Container Pembungkus Canvas */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
          border: `2px dashed ${theme.border}`,
          borderRadius: "8px",
          background: theme.bgCard,
          boxSizing: "border-box",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default CertificateEditor;
