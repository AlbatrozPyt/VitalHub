import RNPickerSelect from "react-native-picker-select";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import moment from "moment";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/index"

const InputSelect = ({ setHora }) => {

  const dataAtual = moment().format('YYYY-MM-DD')
  const [arrayOptions, setArrayOptions] = useState(null)

  async function loadOptions() {
    // Capturar as quantidades de horas que faltam para as 24hs
    const horasRestantes = moment(dataAtual).add(24, 'hours').diff(moment(), 'hours');


    // Criar um laço para a quantidade de horas que sobraram
    const options = Array.from({ length: horasRestantes }, (_, index) => {
      let valor = new Date().getHours() + index + 1;


      // Para cada hora sera criada uma nova Option
      return {
        label: `${valor}:00`, value: valor
      }
    })

    setArrayOptions(options)
  }


  useEffect(() => {
    loadOptions()
  }, [])

  return (
    <View style={{
      width: 350,
      marginBottom: 20
    }}>
      {
        arrayOptions ?
          (
            <RNPickerSelect
              style={style}
              useNativeAndroidPickerStyle={false}
              Icon={() => {
                return <FontAwesomeIcon icon={faCaretDown} color='#34898F' size={22} />
              }}
              placeholder={{
                label: 'Selecione horário',
                value: null,
                color: '#34898F'
              }}
              onValueChange={(value) => setHora(value)}
              items={arrayOptions}
            />
          ) : <Spinner />
      }
    </View>
  )
}

const style = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#60BFC5',
    borderRadius: 5,
    color: '#34898F',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'MontserratAlternates_600SemiBold'
  },
  inputAndroid: {
    fontSize: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#60BFC5',
    borderRadius: 5,
    color: '#34898F',
    alignItems: 'center',
    justifyContent: 'center',

    fontFamily: 'MontserratAlternates_600SemiBold'
  },
  iconContainer: {
    top: '25%',
    marginRight: 10
  },
  placeholder: {
    color: '#34898F',
  }
})

export default InputSelect

