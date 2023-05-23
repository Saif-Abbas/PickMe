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

  //Nav Menu Styling
  navContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginRight: 16
  },
  userInfo: {
    flex: 1
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4
  },
  userRating: {
    fontSize: 14,
    color: '#888'
  },
  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginVertical: 12
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto'
  },
  bottomIcon: {
    padding: 16
  },
  bottomIconText: {
    fontSize: 20
  },

  //Log In Styling
  phoneInput: {
    width: '60%',
    height: 30,
    borderBottomWidth: 1,
    marginRight: 10,
    marginLeft: 5,
    fontSize: 16
  },
  loginButton: {
    width: '30%',
    backgroundColor: '#000',
    borderRadius: 6,
    borderColor: '#000',
    alignItems: 'center',
    paddingVertical: 12,
    height: '20px'
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  loginLink: {
    color: '#0f0f0f',
    marginTop: 10,
    textDecorationLine: 'underline'
  },
  country: {
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },

  //Sign Up Styling
  nameInput: {
    width: '88%',
    height: 30,
    borderRadius: 5,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    textAlign: 'left'
  },
  nationalIDInput: {
    width: '88%',
    height: 30,
    borderRadius: 5,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    textAlign: 'left'
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
  imgUser: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2
  },
  //Profile Styling

  imgUserProfile: {
    marginTop: 24,
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
  profileDatePicker: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16
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

  profileContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  returnIcon: {
    position: 'absolute',
    top: 16,
    left: 16
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginVertical: 24
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8
  },
  saveButton: {
    backgroundColor: '#00c',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center'
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  datePickerStyle: {
    width: 150,
    marginTop: 20
  },

  //Trip History Styling
  tripContainer: {
    flexDirection: 'row',
    marginVertical: 24,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  driverImage: {
    width: 50,
    height: 50,
    borderRadius: 25 / 2,
    marginRight: 16
  },
  tripDetails: {
    flex: 1
  },
  driverInfo: {
    marginBottom: 8
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  driverRating: {
    fontSize: 14,
    color: '#888'
  },
  driverCar: {
    fontSize: 14
  },
  tripRoute: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  routeText: {
    flex: 1,
    fontSize: 14
  },
  tripCost: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  //Payment Method Styling
  paymentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  paymentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  paymentMethod: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center'
  },
  //Settings Styling
  settingHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24
  },
  settingButton: {
    width: '30%',
    backgroundColor: '#000',
    borderRadius: 6,
    borderColor: '#000',
    alignItems: 'center',
    paddingVertical: 12,
    height: '8%',
    marginVertical: 10
  },
  settingButtonText: {
    color: '#000',
    backgroundColor: '#red',
    fontWeight: 'bold',
    textAlign: 'center'
  }
};
