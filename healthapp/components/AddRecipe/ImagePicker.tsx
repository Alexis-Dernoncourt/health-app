import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {Button} from 'react-native-paper';
import {Camera, FolderArchiveIcon, XSquareIcon} from 'lucide-react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {COLORS} from '../../lib/constants';

const ImagePicker = () => {
  // const containerStyle = {backgroundColor: 'white', padding: 20};
  const [uri, setUri] = React.useState<(string | undefined)[]>([]);
  console.log('🚀 ~ ImagePicker ~ uri:', uri);

  // ref
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  const library = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'mixed',
        includeBase64: false,
        quality: 1,
        presentationStyle: 'fullScreen',
      });
      if (result.assets?.length) {
        setUri(result.assets.map(x => x.uri));
        handleHideModalPress();
      }
    } catch (error) {
      console.error('🚀 ~ error:', error);
    }
  };

  const camera = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'mixed',
        includeBase64: false,
        quality: 1,
        presentationStyle: 'fullScreen',
      });
      if (result.assets?.length) {
        setUri(result.assets.map(x => x.uri));
        handleHideModalPress();
      }
    } catch (error) {
      console.error('🚀 ~ error:', error);
    }
  };

  // callbacks
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleHideModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handleSheetChanges = React.useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderCameraIcon = (color: keyof typeof COLORS = 'black') => {
    return <Camera color={COLORS[color]} />;
  };

  const renderCloseIcon = () => {
    return <XSquareIcon />;
  };

  const renderFolderIcon = (color: keyof typeof COLORS = 'black') => {
    return <FolderArchiveIcon color={COLORS[color]} />;
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <View style={styles.contentContainer}>
          {uri.length ? (
            <Image
              source={{uri: uri.toString()}}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                width: '100%',
                height: 235,
                objectFit: 'cover',
                borderRadius: 5,
              }}
            />
          ) : null}
          <Button
            onPress={handlePresentModalPress}
            mode="contained"
            style={styles.button}
            textColor={COLORS.black}
            labelStyle={styles.buttonContentStyle}
            icon={() => renderCameraIcon('black')}>
            Ajouter une image
          </Button>
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}>
          <BottomSheetView style={styles.contentContainer}>
            <Button
              onPress={handleHideModalPress}
              style={styles.closeButton}
              textColor={COLORS.black}
              labelStyle={styles.buttonContentStyle}
              accessibilityLabel="Close"
              icon={renderCloseIcon}>
              Fermer
            </Button>
            <View style={{paddingVertical: 30, gap: 20}}>
              <Button
                onPress={library}
                mode="contained"
                style={styles.button}
                textColor={COLORS.white}
                labelStyle={styles.buttonContentStyle}
                accessibilityLabel="Ajouter une image"
                icon={() => renderFolderIcon('white')}>
                Depuis la galerie
              </Button>
              <Button
                onPress={camera}
                mode="contained"
                style={styles.button}
                textColor={COLORS.white}
                labelStyle={styles.buttonContentStyle}
                accessibilityLabel="Prendre une photo"
                icon={() => renderCameraIcon('white')}>
                Prendre une photo
              </Button>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 220,
  },
  button: {
    backgroundColor: COLORS.primary_accent,
    marginTop: 20,
  },
  buttonContentStyle: {
    fontSize: 18,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 10,
  },
});
