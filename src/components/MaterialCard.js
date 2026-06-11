import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Converte uma string "DD/MM/AAAA" em Date. Retorna null se o formato for invalido.
function parseDataValidade(valor) {
  if (!valor || typeof valor !== 'string') return null;
  const partes = valor.split('/');
  if (partes.length !== 3) return null;
  const [dia, mes, ano] = partes.map(Number);
  if (!dia || !mes || !ano) return null;
  const data = new Date(ano, mes - 1, dia);
  data.setHours(0, 0, 0, 0);
  return data;
}

export default function MaterialCard({ item }) {
  const zerado = Number(item.quantidade) === 0;

  const dataValidade = parseDataValidade(item.dataValidade);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const vencido = !!dataValidade && dataValidade < hoje;

  // Prioridade do alerta: vencido > zerado > ok
  let statusLabel = 'ok';
  let statusStyle = styles.statusOk;
  let statusTextoStyle = styles.statusTextoOk;
  if (vencido) {
    statusLabel = 'vencido';
    statusStyle = styles.statusZero;
    statusTextoStyle = styles.statusTextoZero;
  } else if (zerado) {
    statusLabel = 'zerado';
    statusStyle = styles.statusZero;
    statusTextoStyle = styles.statusTextoZero;
  }

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.qtdLabel}>
          {item.quantidade} {Number(item.quantidade) === 1 ? 'unidade' : 'unidades'}
        </Text>
        {!!item.dataValidade && (
          <Text style={styles.validadeLabel}>
            Validade: {item.dataValidade}
          </Text>
        )}
      </View>
      <View style={[styles.status, statusStyle]}>
        <Text style={[styles.statusTexto, statusTextoStyle]}>
          {statusLabel}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  left: {
    flex: 1,
    gap: 4,
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    letterSpacing: -0.2,
  },
  qtdLabel: {
    fontSize: 13,
    color: '#999',
    fontWeight: '400',
  },
  validadeLabel: {
    fontSize: 12,
    color: '#bbb',
    fontWeight: '400',
  },
  status: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 4,
    marginLeft: 16,
  },
  statusOk: {
    backgroundColor: '#f0faf4',
  },
  statusZero: {
    backgroundColor: '#fff3f3',
  },
  statusTexto: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'lowercase',
  },
  statusTextoOk: {
    color: '#1a7a3f',
  },
  statusTextoZero: {
    color: '#c0392b',
  },
});
