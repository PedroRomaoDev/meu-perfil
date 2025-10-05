import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

// Definindo o tipo para os dados do perfil
interface ProfileData {
  name: string;
  description: string;
  avatarUrl: string;
}

const ProfileScreen = () => {
  // Estado inicial dos dados do perfil
  const [profile, setProfile] = useState<ProfileData>({
    name: 'João da Silva',
    description: 'Desenvolvedor React Native apaixonado por tecnologia e café!',
    avatarUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  });

  // Estados para o modo de edição e para os dados temporários do formulário
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(profile.name);
  const [tempDescription, setTempDescription] = useState<string>(profile.description);

  // Função para salvar as alterações
  const handleSave = () => {
    // Atualiza o estado principal do perfil com os dados do formulário
    setProfile({
      ...profile,
      name: tempName,
      description: tempDescription,
    });
    setIsEditing(false);
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
  };

  // Função para entrar no modo de edição
  const handleEdit = () => {
    // Ao entrar em edição, atualiza os estados temporários com os dados atuais do perfil
    setTempName(profile.name);
    setTempDescription(profile.description);
    setIsEditing(true);
  };

  // Se estiver no modo de edição, renderiza o formulário
  if (isEditing) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Editar Perfil</Text>

        <TextInput
          style={styles.input}
          value={tempName}
          onChangeText={setTempName}
          placeholder="Digite seu nome"
        />

        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={tempDescription}
          onChangeText={setTempDescription}
          placeholder="Digite sua descrição"
          multiline
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Se não estiver em modo de edição, renderiza a tela de perfil
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: profile.avatarUrl }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.description}>{profile.description}</Text>

      <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
        <Text style={styles.editButtonText}>Editar Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilização com StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f7',
    padding: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#ddd',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#dc3545',
    fontSize: 16,
  },
});

export default ProfileScreen;