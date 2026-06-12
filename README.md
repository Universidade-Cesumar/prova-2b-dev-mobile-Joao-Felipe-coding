[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/jOw_Hzd7)

# SysAlmoxarifado — Controle de Estoque (Enfermagem)

Aplicativo mobile em React Native com Expo para modernizar o controle de insumos médicos do almoxarifado de enfermagem, substituindo planilhas Excel por uma solução conectada à nuvem via MockAPI.

---

## Sobre o Sistema

Desenvolvido com base no levantamento de requisitos com a instrutora responsável pelo estoque. O sistema resolve os principais problemas identificados:

- Controle automático de entrada e saída de materiais
- Inventário atualizado em tempo real
- Cadastro ágil de novos insumos diretamente pelo celular
- Alerta visual para itens com estoque zerado
- Campo de busca para filtrar materiais rapidamente

---

## Tecnologias

| Tecnologia | Versão | Finalidade |
|---|---|---|
| React Native | 0.74.5 | Framework mobile |
| Expo | ~51.0.0 | Build e execução |
| MockAPI.io | — | Backend REST simulado |
| Jest + jest-expo | 29 / 51 | Testes automatizados |
| @testing-library/react-native | 13 | Utilitários de teste |

---

## Como Rodar

### Pré-requisitos
- Node.js 18+
- Expo Go instalado no celular (Android/iOS)

### 1. Instale as dependências
```bash
npm install
```

### 2. Configure a MockAPI
Abra `src/services/api.js` e substitua:
```js
const API_URL = 'https://SEU_ID.mockapi.io/materiais';
```
Crie o recurso `materiais` em [mockapi.io](https://mockapi.io/) com os campos `nome` (String) e `quantidade` (Number).

### 3. Inicie o app
```bash
npm start
```
Escaneie o QR Code com o Expo Go.

### 4. Execute os testes
```bash
npm test
```

---

## Estrutura de Pastas

```
├── App.js                        # Componente raiz (tela principal)
├── index.js                      # Entry point do Expo
├── package.json
├── jest.config.js
├── README.md
├── src/
│   ├── services/
│   │   └── api.js                # Funções GET e POST (MockAPI)
│   ├── utils/
│   │   └── validacoes.js         # Regras de negócio (validarRetirada)
│   └── components/
│       └── MaterialCard.js       # Card visual de cada item da lista
└── __tests__/
    ├── sprint1.test.js
    ├── sprint2.test.js
    └── sprint3.test.js
```

---

## Contrato Tecnico — testIDs

| testID | Componente | Sprint |
|---|---|---|
| `input-nome` | TextInput — nome do material | 1 |
| `input-quantidade` | TextInput — quantidade (numérico) | 1 |
| `btn-cadastrar` | TouchableOpacity — botão cadastrar | 1 |
| `lista-materials` | FlatList — lista do inventário | 1 |
| `input-busca` | TextInput — campo de busca | 3 |
| `total-itens` | Text — contador de itens | 3 |

---

## Licenca

Projeto acadêmico — Desenvolvimento Mobile · SENAC 2025.
