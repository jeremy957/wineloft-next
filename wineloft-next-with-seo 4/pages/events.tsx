
import Head from "next/head";

export default function EventsPage() {
  return (
    <>
      <Head>
        <title>Events – Wine Loft on Franklin</title>
        <meta name="description" content="See upcoming events at Wine Loft on Franklin in Johnstown, PA." />
        <link rel="canonical" href="https://www.franklinwineloft.com/events" />
        <meta property="og:title" content="Events – Wine Loft on Franklin" />
        <meta property="og:description" content="Live music, tasting flights, and special gatherings." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.franklinwineloft.com/events" />
        <meta property="og:site_name" content="Wine Loft on Franklin" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Events – Wine Loft on Franklin" />
        <meta name="twitter:description" content="Live music, tasting flights, and special gatherings." />
      </Head>
      <main className="min-h-screen bg-white text-gray-900">
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">Upcoming Events</h1>
              <p className="mt-3 text-gray-600">Pulled directly from our Facebook page — always up to date.</p>
            </div>
            <div className="rounded-2xl border bg-white shadow-lg p-4">
              <div id="sk-events" className="sk-fb-event" data-embed-id="201776" />
              <script
                dangerouslySetInnerHTML={{__html: `
                  (function(){
                    var src='https://widgets.sociablekit.com/facebook-page-events/widget.js';
                    if (!document.querySelector('script[src=\"'+src+'\"]')) {
                      var s=document.createElement('script'); s.src=src; s.defer=true; document.body.appendChild(s);
                    }
                  })();
                `}}
              />
            </div>
            <div className="mt-4 text-center">
              <a className="inline-flex items-center rounded-full border px-4 py-2 text-sm hover:bg-gray-50" href="https://www.facebook.com/wineloftonfranklin/events/" target="_blank" rel="noreferrer">View on Facebook</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
