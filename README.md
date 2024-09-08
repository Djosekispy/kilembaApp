
# Kilemba App

## Visão Geral

O **Kilemba App** é uma aplicação desenvolvida em **React Native** e **Firebase**, projetada para facilitar a gestão e participação em sorteios. A aplicação oferece uma experiência de usuário intuitiva tanto para participantes quanto para administradores, com funcionalidades robustas para garantir a integridade e transparência dos sorteios.

## Funcionalidades Principais

### Para Usuários

- **Login e Registro**: Usuários podem criar uma conta ou fazer login para acessar a plataforma.
- **Candidatura a Sorteios**: Após o login, os usuários podem se candidatar aos sorteios disponíveis. Cada sorteio possui regras específicas, como a proibição de múltiplas candidaturas.
- **Download de Lista de Sorteados**: Após o sorteio, os usuários têm a opção de fazer o download da lista de sorteados diretamente no aplicativo.

### Para Administradores

- **Painel de Administração**: Um painel dedicado permite aos administradores gerenciar os sorteios de forma eficiente.
- **Realização de Sorteios**: Os administradores podem executar sorteios com um simples clique, garantindo que cada sorteio seja realizado apenas uma vez para evitar duplicidades e manter a integridade do processo.

## Tecnologias Utilizadas

- **React Native**: Para o desenvolvimento da interface móvel multiplataforma.
- **Firebase**: Utilizado para autenticação, gerenciamento de dados e armazenamento seguro dos resultados dos sorteios.

## Instalação e Configuração

1. **Clone o repositório**:
   ```bash
   git [https://github.com/Djosekispy/kilembaApp.git]
   cd kilembaApp
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configuração do Firebase**:
   - Adicione suas credenciais do Firebase no arquivo de configuração apropriado (`.env`).
   - Configure as regras de segurança no Firebase Firestore e Firebase Authentication conforme as necessidades da aplicação.

4. **Execute o aplicativo**:
   ```bash
   npx react-native run-android
   # ou para iOS
   npx react-native run-ios
   ```

## Publicação

A versão APK já foi gerada e está disponível para download. [Clique aqui para baixar](https://expo.dev/artifacts/eas/7rWbVb8nmi5V5N8LcJHWhc.apk).

## Uso

### Candidatura a Sorteios
1. Faça login ou registre-se.
2. Navegue até a lista de sorteios disponíveis.
3. Selecione o sorteio desejado e siga as instruções para se candidatar.

### Administração de Sorteios
1. Acesse o painel de administração.
2. Visualize a lista de sorteios ativos.
3. Execute o sorteio com um único clique.
4. Verifique os resultados e disponibilize a lista de sorteados para download.

## Considerações de Segurança

- Cada sorteio só pode ser realizado uma única vez, garantindo a transparência e evitando múltiplas execuções.
- As credenciais e informações dos usuários são protegidas utilizando as melhores práticas de segurança do Firebase.

## Acesso
- test@gmail.com - 123456 ( Usuário normal de teste )
- globof129@gmail.com - 12345678 ( Usuário Admin )

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir um `pull request` ou `issue` para discutir melhorias ou relatar problemas.

## Licença

Este projeto é licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.


