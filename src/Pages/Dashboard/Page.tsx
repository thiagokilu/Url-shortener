import { useEffect, useState } from "react";
import AnalyticCard from "../../Components/AnalyticCard/AnalyticCard";
import CountriesTable from "../../Components/CountriesTable/CountriesTable";
import MyPieChart from "../../Components/PieChart/PieChart";
import ChartHits from "../../Components/Chart/ChartHits";

export default function Analytics() {
  const [hits, setHits] = useState<number>(0);
  const [devices, setDevices] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [shortUrl, setShortUrl] = useState<string>("");
  const [qrcode, setQrCode] = useState<string>("");

  useEffect(() => {
    // tenta pegar da prop
    setShortUrl(localStorage.getItem("shortUrl") || "");

    // se não tiver na prop, tenta pegar do localStorage

    console.log("shortUrl RECEBIDO NO ANALYTICS:", shortUrl);

    // se mesmo assim não achar, não faz nada
    if (!shortUrl) return;

    const id = shortUrl.split("/").pop();
    loadStats(id!);
  }, [shortUrl]);

  const API_BASE = "https://url-shortener-7jk6.onrender.com";

  async function loadStats(id: string) {
    const res = await fetch(`${API_BASE}/stats/${id}`);
    const data = await res.json();
    console.log(data);
    setQrCode(data.qr);
    setHits(data.stats.hits);
    console.log(data.devices);
    console.log(data.countries);
    setDevices(data.devices); // lista de devices
    setCountries(data.countries); // lista de países
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
              Analytics
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Visão geral de métricas e tendências — atualizada em tempo real
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Placeholder for filters / date range / export buttons */}
            <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-transparent shadow-sm bg-white hover:bg-zinc-50 transition">
              Hoje
            </button>
            <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-zinc-800 text-white hover:brightness-95 transition-shadow shadow-md">
              Exportar
            </button>
          </div>
        </header>
        {shortUrl && (
          <div className="flex flex-row gap-5">
            <div className="flex flex-col w-full">
              <a
                href={shortUrl}
                target="_blank"
                className="text-green-700 bg-green-100 px-3 py-1 rounded-lg font-semibold max-w-72"
              >
                {shortUrl}
              </a>
              <div className="mt-4 max-w-64 bg-white rounded-lg p-2">
                <img src={qrcode} alt="qrcode" className="w-full" />
              </div>
            </div>
            <section className="flex flex-row gap-5">
              <AnalyticCard hits={hits} />
            </section>
          </div>
        )}

        {/* Analytic cards grid (responsive) */}

        {/* Charts area */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartHits shortUrl={shortUrl} hits={hits} />

          <CountriesTable countries={countries} hits={hits} />

          <MyPieChart devices={devices} />
        </section>

        {/* Small utilities / summary */}
        <section className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <p className="text-sm text-zinc-500">
            Última atualização:{" "}
            <time dateTime={new Date().toISOString()}>
              {new Date().toLocaleString()}
            </time>
          </p>
          <div className="flex gap-3">
            <button className="px-3 py-1.5 rounded-md bg-white border border-zinc-200 hover:shadow-sm transition">
              Compartilhar
            </button>
            <button className="px-3 py-1.5 rounded-md bg-white border border-zinc-200 hover:shadow-sm transition">
              Configurar
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
