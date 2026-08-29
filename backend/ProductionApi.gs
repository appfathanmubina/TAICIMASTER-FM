/**
 * TAICIMASTER FM — Stage 11.27 Production API Bridge
 * Generic POST dispatcher for the external production shell.
 * Only allowlisted public functions can be called. Each function remains
 * responsible for its own authentication/authorization.
 */
var PRODUCTION_API_ALLOWLIST_ = [
  'addNewUser',
  'authenticateUser',
  'changeOwnPassword',
  'createManualBackup',
  'deleteCatatanWaliKelas',
  'deleteKesehatan',
  'deletePelanggaran',
  'deletePerizinan',
  'deletePrestasi',
  'exportRekapCsv',
  'generateRekapPdf',
  'getAuditLog',
  'getBackupSettings',
  'getBiodataCompletenessWaliKelas',
  'getBiodataSantri',
  'getDashboardAnalytics',
  'getDashboardStats',
  'getDashboardTodayInfo',
  'getKesehatanList',
  'getPelanggaranList',
  'getPendingPrestasiList',
  'getPerizinanList',
  'getPrestasiList',
  'getRekapClassList',
  'getRekapPerAnak',
  'getRekapPerKelas',
  'getRiwayatCatatanWaliKelas',
  'getSantriList',
  'getStage7Status',
  'getSystemConfig',
  'getUserList',
  'getWaliKelasClassSummary',
  'listBackups',
  'logoutUser',
  'restoreBackup',
  'restoreRememberedSession',
  'revokeRememberToken',
  'runSystemHealthCheck',
  'setBackupRetention',
  'simpanCatatanWaliKelas',
  'simpanKesehatan',
  'simpanPelanggaran',
  'simpanPerizinan',
  'simpanPrestasi',
  'updateCatatanWaliKelas',
  'updateFeatureToggle',
  'updateKesehatan',
  'updatePelanggaran',
  'updatePerizinan',
  'updatePrestasi',
  'updatePrestasiApprovalStatus',
  'updateStatusPerizinan',
  'verifyBackup'
];

function doPost(e) {
  try {
    var raw = e && e.postData && e.postData.contents ? e.postData.contents : '';
    var req = JSON.parse(raw || '{}');
    var fn = String(req.functionName || '').trim();
    var args = Array.isArray(req.args) ? req.args : [];
    if (!fn || PRODUCTION_API_ALLOWLIST_.indexOf(fn) < 0) {
      return ContentService.createTextOutput(JSON.stringify({success:false,message:'API function tidak diizinkan.'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    var target = globalThis[fn];
    if (typeof target !== 'function') {
      return ContentService.createTextOutput(JSON.stringify({success:false,message:'API function tidak ditemukan.'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    var result = target.apply(null, args);
    return ContentService.createTextOutput(JSON.stringify(result === undefined ? {success:true} : result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({success:false,message:String(err && err.message || err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
