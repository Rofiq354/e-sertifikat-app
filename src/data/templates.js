export const TEMPLATES = [
  {
    id: "template-1",
    title: "Template Standar Diklat",
    description:
      "Layout sertifikat resmi kegiatan pendidikan dan pelatihan Senkom.",
    color: "#2563eb",
    hasSubEvents: false,
    url: "/diklat-standar/",
  },
  {
    id: "template-2",
    title: "Template Special Event",
    description:
      "Tampilan sertifikat khusus untuk event nasional, pengamanan, dan bakti sosial.",
    color: "#10b981",
    hasSubEvents: true,
    subEvents: [
      {
        id: "bhayangkara",
        name: "Hari Bhayangkara",
        url: "/hari-bhayangkara/",
      },
      {
        id: "pancasila",
        name: "Hari Lahir Pancasila",
        url: "/hari-lahir-pancasila/",
      },
      {
        id: "kesaktian-pancasila",
        name: "Hari Kesaktian Pancasila",
        url: "/hari-kesaktian-pancasila/",
      },
      {
        id: "kemerdekaan",
        name: "Hari Kemerdekaan RI",
        url: "/hari-kemerdekaan/",
      },
      {
        id: "pamong-praja",
        name: "Hari Pamong Praja",
        url: "/hari-pamong-praja/",
      },
    ],
  },
  {
    id: "template-3",
    title: "Template Penghargaan / Piagam",
    description:
      "Desain elegan untuk penghargaan anggota dan apresiasi khusus.",
    color: "#f59e0b",
    hasSubEvents: false,
    url: "/piagam-penghargaan/",
  },
];
