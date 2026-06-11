/**
 * Módulo de comunicação com a MockAPI.
 * Centraliza todas as requisições HTTP do app.
 *
 * Substitua API_URL pela URL do seu projeto em https://mockapi.io/
 * O recurso deve ter os campos: id (auto), nome (String), quantidade (Number)
 */
const API_URL = process.env.EXPO_PUBLIC_API_URL;

/**
 * Busca todos os materiais do inventário (GET)
 */
export async function getMateriais() {
  const resposta = await fetch(API_URL);

  if (!resposta.ok) {
    throw new Error('Erro ao buscar materiais');
  }

  return resposta.json();
}

/**
 * Cadastra um novo material (POST)
 */
export async function postMaterial(material) {
  const resposta = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(material),
  });

  if (!resposta.ok) {
    throw new Error('Erro ao cadastrar material');
  }

  return resposta.json();
}