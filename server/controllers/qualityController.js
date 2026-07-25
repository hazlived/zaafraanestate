const labResultsData = require('../data/labResults');

// GET /api/quality/standards
const getQualityStandards = (req, res) => {
  res.json({
    success: true,
    standards: {
      standardName: 'ISO 3632-1 & ISO 3632-2 Category I',
      giTag: 'GI Registration No. 635 (Kashmir Saffron)',
      labFacility: 'IIKSTC Dusoo, Pampore (NABL Accredited)',
      biochemicalMarkers: [
        { name: 'Crocin (Absorptivity A440nm)', threshold: '>= 200', zaafraanAverage: '268 - 280' },
        { name: 'Safranal (Aroma A330nm)', threshold: '20 - 50', zaafraanAverage: '38 - 45' },
        { name: 'Picrocrocin (Flavor A257nm)', threshold: '>= 70', zaafraanAverage: '88 - 96' },
        { name: 'Moisture Percentage', threshold: '<= 10%', zaafraanAverage: '7.8% - 8.5%' }
      ]
    }
  });
};

// GET /api/quality/batch/:batchId
const verifyBatch = (req, res) => {
  try {
    const { batchId } = req.params;
    const cleanId = batchId.toUpperCase().trim();
    const record = labResultsData.find(b => b.batchId.toUpperCase() === cleanId);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: `Batch code '${batchId}' not found in active harvest logs. Sample valid IDs: ZE-2025-089, ZE-2025-042, ZE-2025-104.`
      });
    }

    res.json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getQualityStandards,
  verifyBatch
};
