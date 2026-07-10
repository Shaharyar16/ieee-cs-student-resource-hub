export default function PrivacyDisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Privacy & Disclaimer</h1>
      <p className="mt-2 text-slate-600">Please read this before contributing or relying on hub content.</p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-slate-600">
        <section>
          <h2 className="text-lg font-semibold text-slate-900">Student-Contributed Data</h2>
          <p className="mt-2">
            Most content on this site — past papers, course details, project entries, and navigation routes
            — is contributed by students on a voluntary basis. While we make a reasonable effort to review
            submissions, we cannot guarantee complete accuracy at all times.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-900">Verification Labels</h2>
          <p className="mt-2">
            Content is marked as <strong>Verified</strong>, <strong>Pending Review</strong>, or{' '}
            <strong>Unverified</strong> based on moderator review. Always double-check unverified or pending
            content against official sources where possible.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-900">Reporting Wrong Data</h2>
          <p className="mt-2">
            If you find incorrect information anywhere on the hub — a wrong past paper, outdated course
            detail, or an inaccurate navigation route — please use the relevant report or correction form so
            we can fix it quickly.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-900">No Teacher Ratings</h2>
          <p className="mt-2">
            We intentionally do not publish teacher ratings, reviews, or opinions of any kind. Teacher
            profiles only contain factual, publicly appropriate contact and course-assignment information.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-900">Form Data Handling</h2>
          <p className="mt-2">
            Data submitted through our forms (contributions, registrations, feedback, etc.) is used solely
            for the purpose of operating and improving this resource hub, and reviewed by student
            moderators. In this prototype, form submissions are stored locally in your browser only.
          </p>
        </section>
      </div>
    </div>
  );
}
