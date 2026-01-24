<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ReservationController extends Controller
{
    public function index()
    {
        return Reservation::orderBy('date', 'asc')->orderBy('heure', 'asc')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string',
            'telephone' => 'required|string',
            'email' => 'nullable|email',
            'date' => 'required|date|after_or_equal:today',
            'heure' => 'required',
            'personnes' => 'required|integer|min:10',
            'remarques' => 'nullable|string',
        ]);

        $reservation = Reservation::create($validated);

        // Email à l'admin
        Mail::raw(
            "Nouvelle réservation !\n\n" .
            "Nom: {$reservation->nom}\n" .
            "Téléphone: {$reservation->telephone}\n" .
            "Email: " . ($reservation->email ?: '-') . "\n" .
            "Date: {$reservation->date}\n" .
            "Heure: {$reservation->heure}\n" .
            "Personnes: {$reservation->personnes}\n" .
            "Remarques: " . ($reservation->remarques ?: '-'),
            function ($message) {
                $message->to('admin@lafalaise.com')
                        ->subject('📅 Nouvelle réservation - La Falaise');
            }
        );

        return $reservation;
    }

    public function update(Request $request, $id)
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->update(['status' => $request->status]);
        return $reservation;
    }
}