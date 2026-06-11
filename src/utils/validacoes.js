/**
 * Valida se uma retirada de material é possível.
 *
 * @param {number} estoqueAtual - Quantidade atual disponível no estoque
 * @param {number} quantidade   - Quantidade que se deseja retirar
 * @returns {boolean} true se a retirada for válida, false caso contrário
 *
 * Regras:
 *  - Quantidade deve ser maior que zero
 *  - Quantidade não pode ser maior que o estoque disponível
 */
export function validarRetirada(estoqueAtual, quantidade) {
  if (quantidade <= 0) return false;
  if (quantidade > estoqueAtual) return false;
  return true;
}
