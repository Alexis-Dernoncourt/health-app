import React from 'react';
import { View, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button } from 'react-native-paper';
import { COLORS } from '../../lib/constants';
import { CameraIcon } from 'lucide-react-native';

export default function CameraCapture({
  onPhotoTaken,
}: {
  onPhotoTaken: (file: { name: string; type: string; uri: string }) => void;
}) {
  /* const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');

  if (!device) return null; */

  const takeImageFromGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.5,
        presentationStyle: 'fullScreen',
        maxWidth: 500,
        maxHeight: 500,
      });
      if (!result.assets) return;

      const { fileName, type, uri } = result.assets[0];
      if (!fileName || !type || !uri) return;
      const file = { name: fileName, type, uri };
      onPhotoTaken(file);
    } catch (error) {
      console.error('🚀 ~ error:', error);
    }
  };

  /*  const takePhoto = async () => {
    const permission = await Camera.requestCameraPermission();
    console.log('🚀 ~ takePhoto ~ permission:', permission);
    if (permission !== 'granted') return;

    const photo = await camera.current?.takePhoto();
    console.log('🚀 ~ test ~ photo:', photo);

    if (!photo) return;
    // onPhotoTaken(photo.path);
  }; */

  const renderIcon = () => <CameraIcon color={COLORS.white} />;

  return (
    <View style={styles.container}>
      {/* <Camera
        style={{ flex: 1 }}
        device={device}
        isActive={true}
        ref={camera}
        photo={true}
      /> */}
      <Button
        style={styles.button}
        labelStyle={styles.buttonLabelStyle}
        onPress={takeImageFromGallery}
        icon={renderIcon}
      >
        Scanner la recette
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    margin: 10,
    width: 300,
    height: 80,
    borderRadius: 10,
    backgroundColor: COLORS.black,
  },
  buttonLabelStyle: {
    color: COLORS.white,
    textTransform: 'uppercase',
  },
});
