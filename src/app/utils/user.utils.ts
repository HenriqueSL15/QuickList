import AsyncStorage from "@react-native-async-storage/async-storage";
import useListStore from "@/src/store/list";
import CurrentList from "../types/CurrentList";

// Função para obter informações do usuário
const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("user_data");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    console.log("Erro ao obter informações do usuário");
    console.log(err);
    return null;
  }
};

// Função para definir informações do usuário
const setUserData = async (userData: CurrentList) => {
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem("user_data", jsonValue);
    console.log("Dados do usuário salvos com sucesso!");
  } catch (err) {
    console.log("Não foi possível definir as informações do usuário");
    console.log(err);
  }
};

// Função para verificar e criar dados do usuário
const initializeUserData = async () => {
  let userData = await getUserData();
  if (userData == null) {
    // Se dados não existirem, cria novos dados
    userData = {
      title: "Lista 1",
      items: [],
    };

    await setUserData(userData);
    console.log("Dados do usuário criados e salvos!");
  } else {
    console.log("Dados do usuário recuperados com sucesso!");
  }
  return userData;
};

// Uso da função de inicialização
const initialize = async () => {
  const userData = await initializeUserData();
  return userData;
};

export { initialize, getUserData, setUserData };
