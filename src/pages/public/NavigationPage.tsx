import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
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
    <div className="relative">
      <PageHero
        compact
        eyebrow="Wayfinding"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Navigation' }]}
        title="CS Block Navigation"
        subtitle="Find your way around the building in four quick steps — pick an entrance, choose where you're headed, and follow the route."
        meta={[
          { value: `${entrances.length}`, label: 'Entrances' },
          { value: `${destinations.length}`, label: 'Mapped Rooms' },
        ]}
      />

      <PageSection tone="cream" top width="wide">
        <div className="mx-auto max-w-4xl">
          {/* Beta notice */}
          <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/80 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <p className="text-sm text-amber-800">
              <span className="font-semibold">Beta version.</span> This navigation tool is still being mapped by
              student volunteers. Routes and estimated times may not be fully accurate yet — please use them as a
              general guide and report anything wrong using the link below.
            </p>
          </div>

          <div className="mt-8">
            <Stepper steps={stepLabels} currentStep={step} />
          </div>

          <div className="mt-10 min-h-[320px]">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-display text-lg font-bold text-slate-800">1. Select your entrance</h2>
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {entrances.map((e) => (
                      <button
                        key={e.id}
                        type="button"
                        data-cursor="link"
                        onClick={() => {
                          setEntranceId(e.id);
                          setStep(1);
                        }}
                        className="group rounded-2xl border border-black/5 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-ieee-orange/40 hover:shadow-md"
                      >
                        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-ieee-orange/10 text-ieee-orange">
                          <Icon name="door" className="h-6 w-6" />
                        </span>
                        <p className="mt-3 text-sm font-semibold text-slate-800">{e.name}</p>
                        <p className="mt-1 text-xs text-slate-500">{e.description}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-display text-lg font-bold text-slate-800">2. Select destination type</h2>
                  <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-5">
                    {destinationTypes.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        data-cursor="link"
                        onClick={() => {
                          setTypeId(t.id);
                          setStep(2);
                        }}
                        className="flex flex-col items-center gap-2 rounded-2xl border border-black/5 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-ieee-orange/40 hover:shadow-md"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ieee-orange/10 text-ieee-orange">
                          <Icon name={t.icon as IconName} className="h-5 w-5" />
                        </span>
                        <p className="text-xs font-medium text-slate-700">{t.label}</p>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-ieee-orange"
                  >
                    <Icon name="arrow-left" className="h-4 w-4" /> Back
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-display text-lg font-bold text-slate-800">3. Select exact destination</h2>
                  {filteredDestinations.length === 0 ? (
                    <p className="mt-4 text-sm text-slate-500">No destinations of this type mapped yet.</p>
                  ) : (
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {filteredDestinations.map((d) => (
                        <button
                          key={d.id}
                          type="button"
                          data-cursor="link"
                          onClick={() => {
                            setDestinationId(d.id);
                            setStep(3);
                          }}
                          className="rounded-2xl border border-black/5 bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:border-ieee-orange/40 hover:shadow-md"
                        >
                          <p className="font-semibold text-slate-800">{d.name}</p>
                          <p className="mt-1 text-xs text-slate-500">
                            {d.floor} — {d.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-ieee-orange"
                  >
                    <Icon name="arrow-left" className="h-4 w-4" /> Back
                  </button>
                </motion.div>
              )}

              {step === 3 && entrance && destination && (
                <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-display text-lg font-bold text-slate-800">4. Your visual route</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    From <span className="font-semibold text-ieee-orange">{entrance.name}</span> to{' '}
                    <span className="font-semibold text-emerald-600">{destination.name}</span>
                  </p>
                  <div className="mt-4 grid gap-6 md:grid-cols-2">
                    <RouteMap entranceName={entrance.name} destinationName={destination.name} />
                    <RouteStepList steps={defaultRoute.steps} estimatedTimeMinutes={defaultRoute.estimatedTimeMinutes} />
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={reset}
                      data-cursor="link"
                      className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-ieee-orange/40 hover:text-ieee-orange"
                    >
                      Start Over
                    </button>
                    <Link
                      to="/navigation/report"
                      data-cursor="link"
                      className="rounded-xl bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
                    >
                      Report Wrong Route
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
