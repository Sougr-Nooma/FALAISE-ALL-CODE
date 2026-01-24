<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    */

    // Chemins où CORS s'applique
    'paths' => [
        'api/*',
        'storage/*',           // Pour les photos uploadées
        'sanctum/csrf-cookie', // Pour Sanctum (futur)
    ],

    // Méthodes HTTP autorisées
    'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

    // Origines autorisées (depuis .env)
    'allowed_origins' => explode(',', env('FRONTEND_URL', 'http://localhost:5173')),

    // Patterns d'origines (pour sous-domaines wildcard si besoin)
    'allowed_origins_patterns' => [],

    // Headers autorisés
    'allowed_headers' => [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'X-CSRF-TOKEN',
        'Accept',
        'Origin',
    ],

    // Headers exposés au client
    'exposed_headers' => [],

    // Durée de cache des pré-requêtes OPTIONS (en secondes)
    'max_age' => 86400, // 24 heures

    // Autoriser les cookies/authentification
    'supports_credentials' => false, // Mettre true si tu utilises Sanctum plus tard

];