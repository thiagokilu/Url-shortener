export default function CountriesTable({ countries, hits }: any) {
  const data = countries || [];

  return (
    <div className="bg-white p-6 w-full max-w-4xl rounded-xl shadow-xl border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-xl text-gray-800">Lista de países</h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Total: {data.length} países
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-gray-700 text-sm font-semibold">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                País
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Engajamento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acessos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                %
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => {
              const porcentagem =
                hits > 0 ? ((item.total / hits) * 100).toFixed(1) : 0;
              const progressColor =
                porcentagem >= 50
                  ? "bg-green-500"
                  : porcentagem >= 25
                  ? "bg-blue-500"
                  : "bg-yellow-500";

              return (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-500 font-medium">
                      {index + 1}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-gray-900 font-medium">
                        {item.country}
                      </span>
                    </div>
                  </td>

                  {/* Barra de Progresso */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-full max-w-xs">
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-2 rounded-full ${progressColor} transition-all duration-500`}
                            style={{ width: `${porcentagem}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-gray-600 text-xs min-w-[40px]">
                        {porcentagem}%
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {item.total}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-900">
                      {porcentagem}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Rodapé informativo */}
      <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
        <div>
          {hits > 0 && (
            <span>
              Total de acessos: <strong>{hits}</strong>
            </span>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-xs">Alto (&gt;50%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-xs">Médio (&gt;25%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-xs">Baixo (&lt;25%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
