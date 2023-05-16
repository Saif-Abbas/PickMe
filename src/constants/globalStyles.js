import colors from './colors';

export default {
  activeOpacity: 0.7,
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  containerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  phoneInput: {
    marginBottom: 20,
    width: '80%',
    height: 40,
    borderBottomWidth: 1
  },
  input: {
    width: '80%',
    height: 40,
    borderBottomWidth: 1,
    marginRight: 10,
    marginLeft: 5,
    fontSize: 16
  },
  inputName: {
    width: '80%',
    height: 40,
    borderBottomWidth: 1,
    marginRight: 10,
    marginLeft: 5,
    fontSize: 16
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  flexRowSpace: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  flexRowNewLine: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30
  },
  button: {
    width: '80%'
  },
  link: {
    color: 'blue',
    marginTop: 10,
    textDecorationLine: 'underline'
  },
  imgUser: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2
  },
  navHeaderStyle: {
    backgroundColor: colors.black,
    borderBottomWidth: 0,
    elevation: 0
  },
  navProfileHeaderContainer: {
    backgroundColor: '#F0F8FF',
    borderBottomWidth: 0,
    elevation: 0
  },
  navProfileHeaderImage: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2
  },
  navButton: {
    width: '100%',
    height: 60,
    marginTop: 20,
    backgroundColor: '#F0F8FF',
    colors: '#000',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navText: {
    fontSize: 20,
    color: '#000'
  },
  navBox: {
    width: '100%',
    height: 50
  },
  navRow: {
    flexDirection: 'row',
    flexWrap: 'wrap,'
  },
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  flex3: { flex: 3 },
  flex4: { flex: 4 },

  mB8: { marginBottom: 8 },
  mR8: { marginRight: 8 },
  mR16: { marginRight: 16 },
  mR24: { marginRight: 24 },
  mR48: { marginRight: 48 },
  mR64: { marginRight: 64 },

  mV16: { marginVertical: 16 },
  mV24: { marginVertical: 24 },
  mV32: { marginVertical: 32 },

  p4: { padding: 4 },
  p8: { padding: 8 },
  p16: { padding: 16 },
  p24: { padding: 24 },

  pH4: { paddingHorizontal: 4 },
  pH8: { paddingHorizontal: 8 },
  pH16: { paddingHorizontal: 16 },
  pH24: { paddingHorizontal: 24 },

  country: {
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  }
};
