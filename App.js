import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { getMateriais, postMaterial } from './src/services/api';
import MaterialCard from './src/components/MaterialCard';

export default function App() {
  const [materiais, setMateriais]     = useState([]);
  const [nome, setNome]               = useState('');
  const [quantidade, setQuantidade]   = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [busca, setBusca]             = useState('');
  const [carregando, setCarregando]   = useState(false);
  const [enviando, setEnviando]       = useState(false);

  const materiaisFiltrados = materiais.filter((m) =>
    m.nome.toLowerCase().includes(busca.toLowerCase())
  );

  useEffect(() => {
    carregarInventario();
  }, []);

  const carregarInventario = async () => {
    setCarregando(true);
    try {
      const dados = await getMateriais();
      setMateriais(dados);
    } catch {
      Alert.alert('Erro', 'Nao foi possivel carregar o inventario.');
    } finally {
      setCarregando(false);
    }
  };

  const cadastrarMaterial = async () => {
    if (!nome.trim()) {
      Alert.alert('Atencao', 'Informe o nome do material.');
      return;
    }
    if (!quantidade.trim() || isNaN(Number(quantidade)) || Number(quantidade) < 0) {
      Alert.alert('Atencao', 'Informe uma quantidade valida.');
      return;
    }
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataValidade.trim())) {
      Alert.alert('Atencao', 'Informe a data de validade no formato DD/MM/AAAA.');
      return;
    }
    setEnviando(true);
    try {
      const criado = await postMaterial({
        nome: nome.trim(),
        quantidade: Number(quantidade),
        dataValidade: dataValidade.trim(),
      });
      setMateriais((prev) => [...prev, criado]);
      setNome('');
      setQuantidade('');
      setDataValidade('');
      Alert.alert('Cadastrado', `${criado.nome} adicionado ao estoque.`);
    } catch {
      Alert.alert('Erro', 'Nao foi possivel cadastrar o material.');
    } finally {
      setEnviando(false);
    }
  };

  // Tudo (formulário, busca e totalizador) fica no cabeçalho da lista,
  // assim os testIDs continuam sempre presentes na árvore, em uma única tela.
  const cabecalho = (
    <View>
      <View style={styles.topo}>
        <Text style={styles.titulo}>Estoque</Text>
        <Text style={styles.subtitulo}>Almoxarifado — Enfermagem</Text>
      </View>

      <View style={styles.formulario}>
        <Text style={styles.formLabel}>Nome do material</Text>
        <TextInput
          testID="input-nome"
          style={styles.input}
          placeholder="ex: Seringa 10ml"
          placeholderTextColor="#ccc"
          value={nome}
          onChangeText={setNome}
          editable={!enviando}
        />

        <Text style={styles.formLabel}>Quantidade</Text>
        <TextInput
          testID="input-quantidade"
          style={styles.input}
          placeholder="0"
          placeholderTextColor="#ccc"
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
          editable={!enviando}
        />

        <Text style={styles.formLabel}>Data de validade</Text>
        <TextInput
          testID="input-data-validade"
          style={styles.input}
          placeholder="DD/MM/AAAA"
          placeholderTextColor="#ccc"
          value={dataValidade}
          onChangeText={setDataValidade}
          keyboardType="numeric"
          maxLength={10}
          editable={!enviando}
        />

        <TouchableOpacity
          testID="btn-cadastrar"
          style={[styles.btnCadastrar, enviando && styles.btnDesabilitado]}
          onPress={cadastrarMaterial}
          disabled={enviando}
        >
          {enviando
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.btnCadastrarTexto}>Cadastrar</Text>
          }
        </TouchableOpacity>
      </View>

      <View style={styles.barraBusca}>
        <TextInput
          testID="input-busca"
          style={styles.inputBusca}
          placeholder="Buscar material..."
          placeholderTextColor="#bbb"
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      <View style={styles.totalizadorRow}>
        <Text style={styles.totalizadorLabel}>Total em estoque</Text>
        <Text testID="total-itens" style={styles.totalizadorValor}>
          {materiaisFiltrados.length}
        </Text>
      </View>

      <View style={styles.divisor} />

      {carregando && (
        <View style={styles.loadingWrap}>
          <ActivityIndicator color="#111" />
          <Text style={styles.loadingTexto}>carregando...</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <FlatList
        testID="lista-materials"
        data={materiaisFiltrados}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <MaterialCard item={item} />}
        contentContainerStyle={styles.listaConteudo}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={cabecalho}
        ListEmptyComponent={
          !carregando ? (
            <View style={styles.vazio}>
              <Text style={styles.vazioTexto}>nenhum material encontrado</Text>
              <TouchableOpacity onPress={carregarInventario} style={{ marginTop: 12 }}>
                <Text style={styles.recarregarTexto}>recarregar</Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Topo
  topo: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 12,
  },
  titulo: {
    fontSize: 34,
    fontWeight: '700',
    color: '#111',
    letterSpacing: -1,
    lineHeight: 38,
  },
  subtitulo: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 2,
    letterSpacing: 0.1,
  },

  // Formulario
  formulario: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 8,
  },
  formLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#e8e8e8',
    paddingVertical: 10,
    fontSize: 17,
    color: '#111',
    fontWeight: '400',
  },
  btnCadastrar: {
    marginTop: 24,
    backgroundColor: '#111',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnDesabilitado: {
    backgroundColor: '#ccc',
  },
  btnCadastrarTexto: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  // Busca
  barraBusca: {
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 16,
  },
  inputBusca: {
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: '#111',
  },

  // Totalizador
  totalizadorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  totalizadorLabel: {
    fontSize: 13,
    color: '#aaa',
  },
  totalizadorValor: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111',
  },

  divisor: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 24,
    marginBottom: 4,
  },

  // Lista
  listaConteudo: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  // Loading / vazio
  loadingWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    gap: 12,
  },
  loadingTexto: {
    fontSize: 13,
    color: '#aaa',
  },
  vazio: {
    alignItems: 'center',
    paddingTop: 40,
  },
  vazioTexto: {
    fontSize: 14,
    color: '#ccc',
  },
  recarregarTexto: {
    fontSize: 13,
    color: '#111',
    textDecorationLine: 'underline',
  },
});
