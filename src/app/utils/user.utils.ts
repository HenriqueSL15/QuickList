import AsyncStorage from "@react-native-async-storage/async-storage";
import useListStore from "@/src/store/list";
import CurrentList from "../types/CurrentList";

/**
 * Recupera os dados do usuário do AsyncStorage.
 * @returns Objeto de dados do usuário ou null se não encontrado ou ocorrer erro.
 */
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

/**
 * Salva os dados do usuário no AsyncStorage.
 * @param userData - O objeto de dados do usuário a ser salvo.
 */
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

/**
 * Verifica se os dados do usuário existem; se não, cria e salva dados padrão.
 * @returns Os dados do usuário existentes ou recém-criados.
 */
const initializeUserData = async () => {
  let userData = await getUserData();
  if (userData == null) {
    // Se não houver dados, cria dados padrão
    userData = {
      title: "Lista 1",
      minimizedShops: [],
      items: [],
    };

    await setUserData(userData);
    console.log("Dados do usuário criados e salvos!");
  } else {
    // Ensure minimizedShops exists for backward compatibility
    if (!userData.minimizedShops) {
      userData.minimizedShops = [];
      await setUserData(userData);
    }
    console.log("Dados do usuário recuperados com sucesso!");
  }
  return userData;
};

/**
 * Inicializa os dados do usuário chamando initializeUserData.
 * @returns O objeto de dados do usuário.
 */
const initialize = async () => {
  const userData = await initializeUserData();
  return userData;
};

export { initialize, getUserData, setUserData };
