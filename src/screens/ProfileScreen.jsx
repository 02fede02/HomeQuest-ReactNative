import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { ProfileHeader } from "../components/layout";
import { AuthContext } from "../context/auth-context/AuthContext";
import { pickImageAsync } from "../helpers";
import { postAvatar } from "../services/postAvatar";

export const ProfileScreen = () => {
  const { authData } = useContext(AuthContext);
  const navigation = useNavigation();
  const [option, setOption] = useState("publish");
  const [userData, setUserData] = useState({});
  const [profilePhoto, setProfilePhoto] = useState();

  const handleOption = (str) => {
    setOption(str);
  };

  const handleProfileImage = async () => {
    const image = await pickImageAsync()
    if (image) {
      const url = await uploadProfileImage(image)
      setProfilePhoto(url)
    }
    if (profilePhoto) {
      postAvatar(profilePhoto, authData.userId, authData.token)
    }
  };

  useEffect(() => {
    const response = async () => {
      await axios
        .get(
          `https://home-quest-app.onrender.com/api/v1/users/${authData.userId}/properties`,
          {
            headers: {
              Authorization: `Bearer ${authData.token}`,
            },
          }
        )
        .then((res) => {
          if (res.data) {
            setUserData(...res.data);
          }
        })
        .catch((err) => console.log(err.response.data));
    };
    response();
  }, []);

  return (
    <View style={styles.container}>
      <ProfileHeader navigation={navigation} />
      <View style={styles.internalContainer}>
        {userData.profilePicture ? null : (
          <Pressable onPress={handleProfileImage}>
            <Image source={require("../../assets/no-profile-big.png")} />
          </Pressable>
        )}
        <Text style={styles.nameText}>
          {authData.user.firstName} {authData.user.lastName}
        </Text>
        <View style={styles.shadowContainer}>
          <View style={styles.middleContainer}>
            <Pressable
              style={styles.middleInternalContainer}
              onPress={() => handleOption("publish")}
            >
              <Image
                source={
                  option === "publish"
                    ? require("../../assets/icons/settings-dollarHouse-icon.png")
                    : require("../../assets/icons/dollarHouse-black-icon.png")
                }
                style={
                  option === "publish"
                    ? styles.dollarHouseIconSelected
                    : styles.dollarHouseIcon
                }
              />
              <Text
                style={[
                  styles.middleText,
                  option === "publish" ? styles.selectedText : null,
                ]}
              >
                Publicaciones
              </Text>
              <View style={styles.selectedBorderBottom} />
            </Pressable>
            <Pressable
              style={[styles.middleInternalContainer]}
              onPress={() => handleOption("message")}
            >
              <Image
                source={
                  option === "message"
                    ? require("../../assets/icons/message-icon.png")
                    : require("../../assets/icons/message-icon.png")
                }
                style={[option === "message" ? styles.iconSelected : null]}
              />
              <Text
                style={[
                  styles.middleText,
                  option === "message" ? styles.selectedText : null,
                ]}
              >
                Mensajes
              </Text>
            </Pressable>
          </View>
          <View style={[ styles.publishBottom, option === "publish" ? styles.selected : null ]} />
          <View style={[styles.messageBottom, option === "message" ? styles.selected : null]} />
        </View>
        <View style={styles.optionContainer}>
          {option === "publish" ? (
            <>
              <Image
                style={styles.houseImage}
                source={require("../../assets/icons/bigGreenHouse-icon.png")}
              />
              <Text style={styles.optionDescriptionText}>
                Todavía no creaste ninguna publicación.
              </Text>
            </>
          ) : (
            <>
              <Image
                source={require("../../assets/icons/messageBig-icon.png")}
                style={styles.messageBigIcon}
              />
              <Text style={styles.optionDescriptionText}>
                Todavia no hiciste ninguna consulta o alguien te envió un
                mensaje.
              </Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  internalContainer: {
    alignItems: "center",
    marginTop: 18,
  },
  nameText: {
    marginVertical: 25,
    fontWeight: "500",
    fontSize: 19,
    lineHeight: 24,
  },
  shadowContainer: {
    overflow: "hidden",
    paddingVertical: 5,
    width: "100%",
  },
  middleContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 14,
    elevation: 12,
    height: 72,
  },
  middleInternalContainer: {
    alignItems: "center",
  },
  middleText: {
    marginTop: 12,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16,
    color: "#1E1E1E",
  },
  iconSelected: {
    tintColor: "#018349",
  },
  selected: {
    borderBottomColor: '#1E1E1E',
    borderBottomWidth: 3
  },
  publishBottom: {
    width: '50%'
  },
  messageBottom: {
    alignSelf: 'flex-end',
    width: '50%'
  },
  selectedText: {
    color: "#018349",
  },
  optionContainer: {
    marginVertical: 12,
    paddingVertical: 15,
    alignItems: "center",
  },
  optionDescriptionText: {
    marginTop: 10,
    width: 220,
    textAlign: "center",
    fontWeight: "300",
    fontSize: 14,
    lineHeight: 21,
  },
  houseImage: {
    width: 144,
    height: 114,
  },
  selectedBorderBottom: {
    // marginBottom: 20,
    borderBottomWidth: 3,
    borderBottomColor: "#018349",
  },
  messageBigIcon: {
    width: 144,
    height: 114,
  },
});
