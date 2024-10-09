import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {COLORS} from '../../lib/constants';
import SelectDropdown from 'react-native-select-dropdown';
import Input from '../Form/Input';
import {Button} from 'react-native-paper';

const IngredientsForm = ({
  itemId,
  setIngredientArray,
  setIngredients,
}: {
  itemId: number;
  setIngredientArray: React.Dispatch<React.SetStateAction<number[]>>;
  setIngredients: React.Dispatch<
    React.SetStateAction<
      {id: string; name: string; quantity: string; unit: string}[]
    >
  >;
}) => {
  const [ingredient, setIngredient] = React.useState('');
  const [ingredientEdited, setIngredientEdited] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [quantityEdited, setQuantityEdited] = React.useState('');
  const [unite, setUnite] = React.useState('');
  //   const [ingredients, setIngredients] = React.useReducer(
  //     (
  //       state: any,
  //       action: {
  //         type: 'add' | 'remove';
  //         payload: {name?: string; quantity?: string; unit?: string};
  //       },
  //     ) => {
  //       switch (action.type) {
  //         case 'add':
  //           return [...state, action.payload];
  //         case 'remove':
  //           return state.filter((item: any) => item !== action.payload);
  //         default:
  //           return state;
  //       }
  //     },
  //     [],
  //   );

  const updateIngredients = useCallback(
    (action = '') =>
      setIngredients(prev => {
        // TODO: refactor to set ingredients with new value edited (filter)
        if (prev?.some(item => item.id === itemId.toString())) {
          if (action === 'delete') {
            return prev.filter(item => item.id !== itemId.toString());
          }
          return prev.map(item => {
            if (item.id === itemId.toString()) {
              return {
                ...item,
                name: ingredientEdited,
                quantity: quantityEdited,
                unit: unite,
              };
            } else {
              return item;
            }
          });
        } else {
          if (!ingredientEdited || !quantityEdited || !unite) {
            return [];
          }
          return [
            ...prev,
            {
              id: itemId.toString(),
              name: ingredientEdited,
              quantity: quantityEdited,
              unit: unite,
            },
          ];
        }
      }),
    [itemId, setIngredients, ingredientEdited, quantityEdited, unite],
  );

  useEffect(() => {
    if (ingredientEdited && quantityEdited && unite) {
      updateIngredients();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientEdited, quantityEdited, unite]);

  return (
    <View>
      <View style={styles.groupWrapper}>
        <Input
          label="Ingrédient"
          keyboardType="default"
          value={ingredient}
          // error={emailErrorText.length > 0}
          style={styles.ingredientInput}
          onChangeText={(val: string) => setIngredient(val)}
          onEndEditing={e => {
            setIngredientEdited(e.nativeEvent.text);
          }}
        />
        {/* {title->error && (
            <Text style={styles.errorText}>{titleErrorText}</Text>
            )} */}
        <Input
          label="Quantité"
          keyboardType="number-pad"
          value={quantity}
          // error={emailErrorText.length > 0}
          style={styles.quantityInput}
          onChangeText={(val: string) => setQuantity(val)}
          onEndEditing={e => {
            setQuantityEdited(e.nativeEvent.text);
          }}
        />
        {/* {title->error && (
            <Text style={styles.errorText}>{titleErrorText}</Text>
            )} */}
        <ListUnits style={styles.unitListInput} setUnite={setUnite} />
        <Button
          compact={true}
          contentStyle={styles.removeButtonContent}
          style={styles.removeButton}
          labelStyle={styles.removeLabel}
          onPress={() => {
            setIngredientArray(prev =>
              prev.filter(prevItem => prevItem !== itemId),
            );
            updateIngredients('delete');
          }}>
          x
        </Button>
      </View>
    </View>
  );
};

const ListUnits = ({
  style,
  setUnite,
}: {
  style: ViewStyle;
  setUnite: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const unitsData = [
    {
      id: 1,
      title: 'g.',
    },
    {
      id: 2,
      title: 'kg',
    },
    {
      id: 3,
      title: 'ml',
    },
    {
      id: 4,
      title: 'cl',
    },
    {
      id: 5,
      title: 'L.',
    },
    {
      id: 6,
      title: 'U.',
    },
  ];
  return (
    <SelectDropdown
      data={unitsData}
      defaultValue=""
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
        setUnite(selectedItem.title);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={[styles.dropdownButtonStyle, style]}>
            <Text style={styles.dropdownButtonTxtStyle}>
              {(selectedItem && selectedItem.title) || 'Unité'}
            </Text>
            <Text style={styles.dropdownButtonIconStyle}>
              {isOpened ? '⋀' : '⋁'}
            </Text>
          </View>
        );
      }}
      renderItem={(item, _, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && {backgroundColor: '#D2D9DF'}),
            }}>
            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};

export default IngredientsForm;

const styles = StyleSheet.create({
  groupWrapper: {
    width: '100%',
    flexDirection: 'row',
    // flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputStyle: {
    marginTop: 20,
  },
  ingredientInput: {
    width: '45%',
  },
  quantityInput: {
    width: '20%',
    alignItems: 'center',
    textAlign: 'center',
  },
  unitListInput: {
    width: '20%',
  },
  removeButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButton: {
    minWidth: 10,
    width: 25,
    backgroundColor: COLORS.red,
    borderRadius: 100,
  },
  removeLabel: {
    lineHeight: 20,
    fontSize: 20,
    marginHorizontal: 2,
    marginVertical: 2,
    color: COLORS.white,
  },
  // Dropdown
  dropdownButtonStyle: {
    width: 'auto',
    height: 55,
    backgroundColor: COLORS.white,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownButtonIconStyle: {
    fontSize: 12,
    marginLeft: 'auto',
    color: COLORS.black,
    fontWeight: '700',
  },
});
