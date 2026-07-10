import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Stepper from '@/components/ui/Stepper';
import RouteMap from '@/components/navigation/RouteMap';
import RouteStepList from '@/components/navigation/RouteStepList';
import Icon, { type IconName } from '@/components/ui/Icon';
import { entrances, destinationTypes, defaultRoute } from '@/data/routes';
import { destinations } from '@/data/destinations';

const stepLabels = ['Entrance', 'Destination Type', 'Destination', 'Route'];

export default function NavigationPage() {
  const [step, setStep] = useState(0);
  const [entranceId, setEntranceId] = useState<string | null>(null);
  const [typeId, setTypeId] = useState<string | null>(null);
  const [destinationId, setDestinationId] = useState<string | null>(null);

  const entrance = entrances.find((e) => e.id === entranceId);
  const destination = destinations.find((d) => d.id === destinationId);
  const filteredDestinations = destinations.filter((d) => d.typeId === typeId);

  const reset = () => {
    setStep(0);
    setEntranceId(null);
    setTypeId(null);
    setDestinationId(null);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">CS Block Navigation</h1>
      <p className="mt-2 text-slate-600">Find your way around the building in four quick steps.</p>

      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <p className="text-sm text-amber-800">
          <span className="font-semibold">Beta version.</span> This navigation tool is still being mapped by
          student volunteers. Routes and estimated times may not be fully accurate yet — please use them as
          a general guide and report anything wrong using the link below.
        </p>
      </div>

      <div className="mt-8">
        <Stepper steps={stepLabels} currentStep={step} />
      </div>

      <div className="mt-10 min-h-[320px]">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-lg font-semibold text-slate-800">1. Select your entrance</h2>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {entrances.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => {
                      setEntranceId(e.id);
                      setStep(1);
                    }}
                    className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-ieee-orange hover:shadow-md"
                  >
                    <Icon name="door" className="mx-auto h-6 w-6 text-ieee-blue" />
                    <p className="mt-2 text-sm font-semibold text-slate-800">{e.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{e.description}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-lg font-semibold text-slate-800">2. Select destination type</h2>
              <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-5">
                {destinationTypes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTypeId(t.id);
                      setStep(2);
                    }}
                    className="flex flex-col items-center gap-1 rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-ieee-orange hover:shadow-md"
                  >
                    <Icon name={t.icon as IconName} className="h-6 w-6 text-ieee-blue" />
                    <p className="text-xs font-medium text-slate-700">{t.label}</p>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(0)} className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:underline">
                <Icon name="arrow-left" className="h-4 w-4" /> Back
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-lg font-semibold text-slate-800">3. Select exact destination</h2>
              {filteredDestinations.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500">No destinations of this type mapped yet.</p>
              ) : (
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {filteredDestinations.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => {
                        setDestinationId(d.id);
                        setStep(3);
                      }}
                      className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:border-ieee-orange hover:shadow-md"
                    >
                      <p className="font-semibold text-slate-800">{d.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{d.floor} — {d.description}</p>
                    </button>
                  ))}
                </div>
              )}
              <button onClick={() => setStep(1)} className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:underline">
                <Icon name="arrow-left" className="h-4 w-4" /> Back
              </button>
            </motion.div>
          )}

          {step === 3 && entrance && destination && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-lg font-semibold text-slate-800">4. Your visual route</h2>
              <p className="mt-1 text-sm text-slate-500">
                From <span className="font-semibold text-ieee-orange">{entrance.name}</span> to{' '}
                <span className="font-semibold text-emerald-600">{destination.name}</span>
              </p>
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                <RouteMap entranceName={entrance.name} destinationName={destination.name} />
                <RouteStepList steps={defaultRoute.steps} estimatedTimeMinutes={defaultRoute.estimatedTimeMinutes} />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={reset} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-ieee-orange hover:text-ieee-orange">
                  Start Over
                </button>
                <Link to="/navigation/report" className="rounded-lg bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-100">
                  Report Wrong Route
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
