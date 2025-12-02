import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useDeviceInfo } from "../../hooks/useDeviceInfo";

type FormData = {
  url: string;
};

const schema = z.object({
  url: z.string().url("URL inválida"),
});

// const apiurl = "http://localhost:3333";
const apiurl = "https://url-shortener-7jk6.onrender.com";

export default function Home({ setShortUrl }: any) {
  const [localShortUrl, setLocalShortUrl] = useState<string | null>(null);
  const [hits, setHits] = useState<number>(0);
  const [qrcode, setQrcode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const device = useDeviceInfo();
  const navigate = useNavigate();

  // Atualiza hits em tempo real
  useEffect(() => {
    const saved = localStorage.getItem("shortUrl");
    if (saved) {
      setLocalShortUrl(saved);

      const id = saved.split("/").pop();
      loadStats(id!);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    try {
      const region = await fetch("https://ipwho.is/").then((r) => r.json());
      const country = region.country || "Unknown";
      console.log(country);

      setLoading(true);

      const response = await fetch(`${apiurl}/encurtar`, {
        method: "POST",
        body: JSON.stringify({ url: data.url, device, country }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      setShortUrl(result.shortUrl); // envia para o App (global)
      setLocalShortUrl(result.shortUrl); // mantém aqui no Home (local)
      setQrcode(result.qr);
      navigate("/Analytics");

      localStorage.setItem("shortUrl", result.shortUrl);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  }

  async function loadStats(id: string) {
    const res = await fetch(`${apiurl}/stats/${id}`);
    const data = await res.json();
    setHits(data.hits);
  }

  return (
    <div className="bg-zinc-100 min-h-screen flex justify-center items-center p-4">
      <div className="flex flex-col items-center bg-white w-full max-w-xl p-6 md:p-10 rounded-2xl shadow-lg gap-8">
        <h1 className="font-semibold text-3xl text-center">
          Encurtador de URL 2.0
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col md:flex-row gap-4"
        >
          <input
            {...register("url")}
            placeholder="Sua URL"
            className="flex-1 border-2 border-zinc-300 rounded-xl p-3 focus:outline-none 
                       focus:ring-2 focus:ring-green-500 transition"
          />
          <input
            type="submit"
            value="Encurtar"
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold 
                       hover:bg-green-700 cursor-pointer transition"
          />
        </form>

        <p className="text-red-600">{errors.url?.message}</p>

        {/* Resultados */}
        <div className="flex flex-col gap-4 text-center">
          {loading && <span className="text-green-700">Carregando...</span>}

          {/* {localShortUrl && !loading && (
            <div>
              <a
                href={localShortUrl}
                target="_blank"
                className="text-green-600 underline break-all"
              >
                {localShortUrl}
              </a>

              {hits > 0 && <span className="text-black">{hits} acessos</span>}

              {qrcode && (
                <img src={qrcode} alt="qrcode" className="w-full mt-4" />
              )}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
