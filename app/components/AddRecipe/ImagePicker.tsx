import {Camera} from 'lucide-react-native';
import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Avatar, Text} from 'react-native-paper';

const ImagePicker = () => {
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const [uri, setUri] = React.useState<(string | undefined)[]>([]);
  const camera = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'mixed',
        includeBase64: false,
        quality: 1,
        presentationStyle: 'fullScreen',
      });
      if (result.assets?.length) {
        setUri(result.assets.map(x => x.uri));
      }
    } catch (error) {
      console.error('🚀 ~ error:', error);
    }
  };
  console.log('🚀 ~ camera ~ camera:', camera);

  // const handleSheetChanges = (index: number) => {
  //   console.log('handleSheetChanges', index);
  // };

  return (
    <View>
      <Pressable
        // eslint-disable-next-line react-native/no-inline-styles
        style={{...containerStyle, alignItems: 'center'}}
        onPress={() => camera()}>
        {uri.length ? (
          <Image
            source={{uri: uri.toString()}}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: '100%',
              height: 300,
              objectFit: 'cover',
              marginBottom: 10,
              borderRadius: 10,
            }}
          />
        ) : (
          <>
            <Avatar.Icon
              style={{backgroundColor: 'transparent'}}
              icon={() => <Camera />}
              size={80}
            />
            <Text
            // label="Image de la recette"
            // keyboardType="default"
            // style={styles.inputStyle}
            >
              Ajouter une image
            </Text>
          </>
        )}
      </Pressable>
    </View>
  );
};

export default ImagePicker;
