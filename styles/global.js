import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
      },
    
      header: {
        backgroundColor: "black",
        marginTop: 50,
        padding: 12,
        flexDirection: "row", // Aligns logo, menu, and icon horizontally
        justifyContent: "space-between", // Spacing between logo, menu, and icon
        alignItems: "center", // Centers items vertically
      },
    
      logo: {
        width: 150,
        height: 150,
        marginTop: 30,
        marginBottom: 10,
        marginLeft: 135,
        borderRadius: 30,
        resizeMode: "contain",
      },
    
      menuIcon: {
        padding: 10, // Add padding around the burger icon for easier tap
      },
    
      icon: {
        fontSize: 24,
        color: "white",
        marginRight: 10,
      },

      logoicon: {
        width: 20,
        height: 40,
        marginRight: 190,
        marginLeft: 15,
      },
    
      heroSection: {
        alignItems: "center",
        padding: 20,
        backgroundColor: "white",
      },
    
      heroText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 5,
      },
    
      orderNowButton: {
        backgroundColor: "black",
        padding: 15,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
        marginBottom: 10,
      },
    
      orderNowText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
      },
    
      orderHistoryButton: {
        backgroundColor: "black",
        padding: 15,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
      },
    
      orderHistoryText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
      },

      reservationButton: {
        backgroundColor: "black",
        padding: 15,
        marginTop: 10,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
      },
      
      reservationText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
      },
    
      sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 20,
        marginVertical: 10,
      },
    
      Menu: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginVertical: 10,
      },
    
      MenuImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        backgroundColor: "#ddd",
      },

      carouselContainer: {
        paddingHorizontal: 10,
      },
      menuItem: {
        marginHorizontal: 10,
        alignItems: "center",
      },
      menuItemImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
        backgroundColor: "#ddd",
      },
      menuItemText: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: "bold",
      },
      iconsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },

      //Customer Support
      pageContainer: {
        flex: 1,
      },
      chatIcon: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "black",
        padding: 15,
        borderRadius: 50,
        elevation: 5, // For Android shadow
        shadowColor: "#000", // For iOS shadow
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
    });
    