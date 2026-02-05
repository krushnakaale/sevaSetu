const asyncHandler = require("../utils/asyncHandler");

// Mock Medicine Data (In production, use a Medicine model)
const mockMedicines = [
  {
    _id: "1",
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    manufacturer: "GSK",
    price: 25,
    prescription_required: false,
    stock: 100,
    description: "For fever and mild to moderate pain",
    image: "https://via.placeholder.com/200",
  },
  {
    _id: "2",
    name: "Amoxicillin 250mg",
    category: "Antibiotic",
    manufacturer: "Cipla",
    price: 120,
    prescription_required: true,
    stock: 50,
    description: "Broad-spectrum antibiotic",
    image: "https://via.placeholder.com/200",
  },
  {
    _id: "3",
    name: "Cetirizine 10mg",
    category: "Allergy",
    manufacturer: "Sun Pharma",
    price: 35,
    prescription_required: false,
    stock: 80,
    description: "For allergic rhinitis and urticaria",
    image: "https://via.placeholder.com/200",
  },
];

// @desc    Get all medicines
// @route   GET /api/medicines
// @access  Public
exports.getAllMedicines = asyncHandler(async (req, res) => {
  const {
    category,
    minPrice,
    maxPrice,
    prescription,
    page = 1,
    limit = 12,
  } = req.query;

  let filteredMedicines = [...mockMedicines];

  // Filter by category
  if (category) {
    filteredMedicines = filteredMedicines.filter(
      (m) => m.category.toLowerCase() === category.toLowerCase(),
    );
  }

  // Filter by price range
  if (minPrice) {
    filteredMedicines = filteredMedicines.filter(
      (m) => m.price >= parseInt(minPrice),
    );
  }
  if (maxPrice) {
    filteredMedicines = filteredMedicines.filter(
      (m) => m.price <= parseInt(maxPrice),
    );
  }

  // Filter by prescription requirement
  if (prescription !== undefined) {
    const requiresPrescription = prescription === "true";
    filteredMedicines = filteredMedicines.filter(
      (m) => m.prescription_required === requiresPrescription,
    );
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedMedicines = filteredMedicines.slice(startIndex, endIndex);

  res.status(200).json({
    success: true,
    count: paginatedMedicines.length,
    total: filteredMedicines.length,
    page: parseInt(page),
    pages: Math.ceil(filteredMedicines.length / limit),
    data: paginatedMedicines,
  });
});

// @desc    Get medicine by ID
// @route   GET /api/medicines/:id
// @access  Public
exports.getMedicineById = asyncHandler(async (req, res) => {
  const medicine = mockMedicines.find((m) => m._id === req.params.id);

  if (!medicine) {
    return res.status(404).json({
      success: false,
      message: "Medicine not found",
    });
  }

  res.status(200).json({
    success: true,
    data: medicine,
  });
});

// @desc    Search medicines
// @route   GET /api/medicines/search
// @access  Public
exports.searchMedicines = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({
      success: false,
      message: "Please provide search query",
    });
  }

  const results = mockMedicines.filter(
    (m) =>
      m.name.toLowerCase().includes(q.toLowerCase()) ||
      m.category.toLowerCase().includes(q.toLowerCase()) ||
      m.manufacturer.toLowerCase().includes(q.toLowerCase()),
  );

  res.status(200).json({
    success: true,
    count: results.length,
    data: results,
  });
});
