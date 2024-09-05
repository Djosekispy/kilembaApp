import { UserProps } from '@/interfaces/ICandidate';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';


export const generatePDF = async (candidatos: UserProps[]) => {
  // Gerar a tabela com a lista dos sorteados
  const tableRows = candidatos
    .map((candidato, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${candidato.nome}</td>
        <td>${candidato.endereco}</td>
        <td>${candidato.telefone}</td>
      </tr>
    `)
    .join('');

  // Conteúdo do HTML
  const html = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #333;
            margin: 0;
            padding: 20px;
          }
          .container {
            width: 100%;
            margin: auto;
            text-align: center;
          }
          h1 {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          h2 {
            font-size: 18px;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            margin-bottom: 20px;
          }
          table, th, td {
            border: 1px solid black;
          }
          th, td {
            padding: 10px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          .signature {
            margin-top: 50px;
            text-align: center;
          }
          .signature-space {
            margin-top: 50px;
            text-align: center;
            border-bottom: 1px solid black;
            width: 250px;
            margin-right: 50px;
          }
          .logo {
            width: 100px;
            margin-bottom: 10px;
          }
          .header-text {
            text-align: center;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Insígnia -->
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2cWNtDfrNvwfLYFbTtNcR7ZaoniFK6WqaXw&s" class="logo" alt="Insígnia da República de Angola" />

          <!-- Cabeçalho -->
          <div class="header-text">
            <h1>República de Angola</h1>
            <h1>Ministério da Administração e Urbanismo</h1>
            <h1>Governo Provincial do Lubango</h1>
          </div>

          <!-- Título -->
          <h2>Listas dos sorteados para Apartamentos</h2>

          <!-- Tabela dos Sorteados -->
          <table>
            <tr>
              <th>Nº</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Telefone</th>
            </tr>
            ${tableRows}
          </table>

          <!-- Espaço para assinatura -->
          <div class="signature">
            <div class="signature-space"></div>
            <p>Assinatura</p>
          </div>
        </div>
      </body>
    </html>
  `;

  // Geração do PDF e compartilhamento
  const { uri } = await Print.printToFileAsync({ html });
  await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
};
