<?php
// TAICIMASTER FM — Stage 11.27 same-origin proxy
// Set the exact deployed Apps Script /exec URL below.
const GAS_WEB_APP_URL = 'REPLACE_WITH_YOUR_APPS_SCRIPT_EXEC_URL';

header('Cache-Control: no-store');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success'=>false,'message'=>'Method Not Allowed']);
  exit;
}
if (GAS_WEB_APP_URL === 'REPLACE_WITH_YOUR_APPS_SCRIPT_EXEC_URL') {
  http_response_code(500);
  echo json_encode(['success'=>false,'message'=>'Konfigurasi GAS_WEB_APP_URL belum diisi.']);
  exit;
}
$raw = file_get_contents('php://input');
$payload = json_decode($raw, true);
if (!is_array($payload) || empty($payload['functionName']) || !isset($payload['args']) || !is_array($payload['args'])) {
  http_response_code(400);
  echo json_encode(['success'=>false,'message'=>'Payload API tidak valid.']);
  exit;
}
$body = json_encode(['functionName'=>(string)$payload['functionName'], 'args'=>$payload['args']], JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
$ch = curl_init(GAS_WEB_APP_URL);
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_POSTFIELDS => $body,
  CURLOPT_HTTPHEADER => ['Content-Type: application/json','Accept: application/json'],
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_POSTREDIR => 3,
  CURLOPT_CONNECTTIMEOUT => 10,
  CURLOPT_TIMEOUT => 90,
  CURLOPT_SSL_VERIFYPEER => true,
  CURLOPT_SSL_VERIFYHOST => 2,
]);
$response = curl_exec($ch);
$errno = curl_errno($ch);
$error = curl_error($ch);
$status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
if ($errno || $response === false) {
  http_response_code(502);
  echo json_encode(['success'=>false,'__transportError'=>true,'message'=>'Gagal menghubungkan ke backend Apps Script: '.($error ?: 'unknown error')]);
  exit;
}
http_response_code($status >= 200 && $status < 500 ? $status : 502);
echo $response;
