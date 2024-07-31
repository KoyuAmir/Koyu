import 'package:connectify/auth/register_screen.dart';
// import 'package:connectify/screens/homepage.dart';
import 'package:flutter/material.dart';
void main() {
  runApp(MyApp());
}
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'BBL Chat',
      home: SplashScreen(),
    );
  }
}
class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});
  @override
  _SplashScreenState createState() => _SplashScreenState();
}
class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Future.delayed(Duration(seconds: 2), () {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => RegisterScreen()),
      );
    });
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        color: const Color(0xff242B3B),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(height: 320),
            Image.asset(
              'assets/sample.png',
              fit: BoxFit.cover,
            ),
            const Spacer(),
            const Text(
              'from',
              style: TextStyle(
                color: Color.fromARGB(255, 142, 167, 218),
              ),
            ),
            const Text(
              'Brahmabyte Lab',
              style: TextStyle(color: Color(0xFFffffff)),
            ),
            SizedBox(height: 20),
          ],
        ),
      ),
    );
  }
}