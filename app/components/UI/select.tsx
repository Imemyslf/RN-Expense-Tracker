import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { TextInput } from "react-native-paper";

export default function BasicSelect() {
  const [age, setAge] = useState<number | undefined>(undefined);
  const [text, setText] = React.useState<string>("");
  return (
    <>
      <View style={styles.container}>
        <Picker
          selectedValue={age}
          onValueChange={(itemValue) => setAge(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Age" value={undefined} />
          <Picker.Item label="Ten" value={10} />
          <Picker.Item label="Twenty" value={20} />
          <Picker.Item label="Thirty" value={30} />
        </Picker>
      </View>
      <View>
        <TextInput
          style={styles.inputInfo}
          label="Email"
          value={text}
          onChangeText={(text) => setText(text)}
          mode="outlined"
          textColor="black"
          outlineColor="#dddddd"
          activeOutlineColor="#0079fa"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
  },
  picker: {
    height: 100,
    width: "100%",
  },
  inputInfo: {
    backgroundColor: "white",
    color: "black",
  },
});
