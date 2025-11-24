import React from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  url: string;
};

const schema = z.object({
  url: z.string().url("URL inválida"),
});

const apiurl = "https://url-shortener-7jk6.onrender.com";

function App() {
  const [shortUrl, setShortUrl] = React.useState("");
  const [hits, setHits] = React.useState(0);
  React.useEffect(() => {
    console.log("hits atualizado:", hits);
  }, [hits]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    const response = await fetch(
      `${apiurl}/encurtar`, // Replace with your API endpoint URL
      {
        method: "POST",
        body: JSON.stringify({ url: data.url }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    setShortUrl(result.shortUrl);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(result);
    loadStats(result.shortUrl.split("/").pop());
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
        {/* Exibe erro */}
        <p className="text-red-600">{errors.url?.message}</p>

        {/* Exibe URL final */}
        {shortUrl && (
          <div className="flex flex-col gap-4 text-center">
            <h2 className="font-semibold text-xl">Encurtado</h2>
            <a
              href={shortUrl}
              target="_blank"
              className="text-green-600 underline break-all"
            >
              {shortUrl}
            </a>
            <div>
              {" "}
              {hits > 0 && (
                <span className="text- text-black">{hits} acessos</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
