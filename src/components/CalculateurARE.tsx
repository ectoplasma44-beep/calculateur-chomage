'use client'

import { useState } from 'react'
import { calculerARE } from '@/lib/calcul-are'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros, dateFr, pourcent } from '@/lib/format'
import type { ResultatARE, ErreurCalcul } from '@/types/are'

function estResultat(r: ResultatARE | ErreurCalcul): r is ResultatARE {
  return 'sjr' in r
}

const LIBELLES_FORMULES: Record<ResultatARE['formuleRetenue'], string> = {
  formule1: `${pourcent(ARE_PARAMS.tauxFormule1)} du SJR + partie fixe`,
  formule2: `${pourcent(ARE_PARAMS.tauxFormule2)} du SJR`,
  plancher: 'Allocation minimale (plancher)',
}

const MOIS_AVANT_DEGRESSIVITE =
  Math.floor(ARE_PARAMS.joursAvantDegressivite / ARE_PARAMS.joursParMois) + 1

interface CalculateurAREProps {
  defaultSalaire?: number
  defaultMois?: number
  defaultAge?: number
}

export default function CalculateurARE({
  defaultSalaire,
  defaultMois,
  defaultAge,
}: CalculateurAREProps = {}) {
  const [salaire, setSalaire] = useState(defaultSalaire !== undefined ? String(defaultSalaire) : '2500')
  const [mois, setMois] = useState(defaultMois !== undefined ? String(defaultMois) : '24')
  const [age, setAge] = useState(defaultAge !== undefined ? String(defaultAge) : '35')

  const salaireNum = parseFloat(salaire)
  const moisNum = parseInt(mois, 10)
  const ageNum = parseInt(age, 10)

  const champsRemplis =
    salaire !== '' && mois !== '' && age !== '' &&
    !Number.isNaN(salaireNum) && !Number.isNaN(moisNum) && !Number.isNaN(ageNum)

  const resultat = champsRemplis
    ? calculerARE({ salaireBrutMensuel: salaireNum, moisTravailles: moisNum, age: ageNum })
    : null

  return (
    <section
      aria-label="Calculateur d'allocation chômage"
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label htmlFor="salaire" className="mb-1 block text-sm font-medium text-slate-700">
            Salaire brut mensuel (&euro;)
          </label>
          <input
            id="salaire"
            type="number"
            min="0"
            step="50"
            value={salaire}
            onChange={(e) => setSalaire(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <p className="mt-1 text-xs text-slate-500">
            Salaire brut moyen sur la p&eacute;riode travaill&eacute;e
          </p>
        </div>

        <div>
          <label htmlFor="mois" className="mb-1 block text-sm font-medium text-slate-700">
            Mois travaill&eacute;s
          </label>
          <input
            id="mois"
            type="number"
            min="6"
            max="36"
            step="1"
            value={mois}
            onChange={(e) => setMois(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <p className="mt-1 text-xs text-slate-500">
            Sur les {ARE_PARAMS.moisRefMoins55ans} derniers mois ({ARE_PARAMS.moisRefPlus55ans} mois
            si {ARE_PARAMS.ageLimiteDegressivite} ans et plus)
          </p>
        </div>

        <div>
          <label htmlFor="age" className="mb-1 block text-sm font-medium text-slate-700">
            &Acirc;ge au terme du contrat
          </label>
          <input
            id="age"
            type="number"
            min="16"
            max="80"
            step="1"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <p className="mt-1 text-xs text-slate-500">
            &Acirc;ge &agrave; la date de fin du contrat de travail
          </p>
        </div>
      </div>

      <div className="mt-8">
        {!champsRemplis && (
          <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
            Renseignez les trois champs pour obtenir votre estimation.
          </p>
        )}

        {resultat && !estResultat(resultat) && (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {resultat.message}
          </p>
        )}

        {resultat && estResultat(resultat) && (
          <div className="rounded-xl bg-blue-50 p-6 ring-1 ring-blue-100">
            <h2 className="text-lg font-semibold text-blue-900">Votre estimation</h2>

            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <dt className="text-sm text-slate-600">Allocation mensuelle brute</dt>
                <dd className="mt-1 text-3xl font-bold text-blue-700">
                  {euros(resultat.allocationMensuelleBrute)}
                </dd>
                <p className="mt-1 text-xs text-slate-500">
                  soit {euros(resultat.allocationJournaliereBrute)} par jour
                </p>
              </div>

              <div className="rounded-lg bg-white p-4 shadow-sm">
                <dt className="text-sm text-slate-600">Dur&eacute;e d&apos;indemnisation</dt>
                <dd className="mt-1 text-3xl font-bold text-blue-700">
                  {resultat.dureeIndemnisationMois} mois
                </dd>
                <p className="mt-1 text-xs text-slate-500">
                  {resultat.dureeIndemnisationJours} jours indemnisables
                </p>
              </div>

              <div className="rounded-lg bg-white p-4 shadow-sm">
                <dt className="text-sm text-slate-600">Salaire journalier de r&eacute;f&eacute;rence (SJR)</dt>
                <dd className="mt-1 text-xl font-bold text-slate-900">{euros(resultat.sjr)}</dd>
              </div>

              <div className="rounded-lg bg-white p-4 shadow-sm">
                <dt className="text-sm text-slate-600">Formule retenue</dt>
                <dd className="mt-1 text-xl font-bold text-slate-900">
                  {LIBELLES_FORMULES[resultat.formuleRetenue]}
                </dd>
              </div>
            </dl>

            {resultat.degressivite.applicable &&
              resultat.degressivite.ajMensuelleApres !== undefined &&
              resultat.degressivite.ajJournaliereApres !== undefined && (
                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <p className="text-sm font-semibold text-amber-900">
                    D&eacute;gressivit&eacute; applicable &agrave; partir du {MOIS_AVANT_DEGRESSIVITE}e mois d&apos;indemnisation
                  </p>
                  <p className="mt-1 text-sm text-amber-800">
                    Votre allocation passerait alors &agrave;{' '}
                    <strong>{euros(resultat.degressivite.ajMensuelleApres)}</strong> par mois
                    ({euros(resultat.degressivite.ajJournaliereApres)} par jour).
                  </p>
                </div>
              )}

            {resultat.avertissements.length > 0 && (
              <ul className="mt-4 space-y-1">
                {resultat.avertissements.map((a) => (
                  <li key={a} className="text-sm text-slate-600">
                    &#9888;&#65039; {a}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 space-y-1 border-t border-slate-100 pt-4">
        <p className="text-xs text-slate-500">
          Estimation indicative. France Travail calcule sur la base de vos attestations employeur.
        </p>
        <p className="text-xs text-slate-500">
          Bar&egrave;me en vigueur depuis le {dateFr(ARE_PARAMS.dateValeur)}
        </p>
      </div>
    </section>
  )
}
