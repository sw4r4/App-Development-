import 'package:flutter/material.dart';
import 'package:math_expressions/math_expressions.dart';

void main() {
  runApp(const CalculatorApp());
}

class CalculatorApp extends StatelessWidget {
  const CalculatorApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Calculator',
      theme: ThemeData(primarySwatch: Colors.blueGrey),
      home: const CalculatorHome(),
    );
  }
}

class CalculatorHome extends StatefulWidget {
  const CalculatorHome({super.key});

  @override
  State<CalculatorHome> createState() => _CalculatorHomeState();
}

class _CalculatorHomeState extends State<CalculatorHome> {
  String input = '';
  String output = '';

  void onButtonClick(String value) {
    setState(() {
      if (value == 'C') {
        input = '';
        output = '';
      } else if (value == 'DEL') {
        if (input.isNotEmpty) input = input.substring(0, input.length - 1);
      } else if (value == '=') {
        try {
          Parser p = Parser();
          Expression exp = p.parse(input);
          ContextModel cm = ContextModel();
          double eval = exp.evaluate(EvaluationType.REAL, cm);
          output = eval.toString();
        } catch (e) {
          output = 'Error';
        }
      } else {
        input += value;
      }
    });
  }

  Widget buildButton(String text, Color color) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        backgroundColor: color,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        padding: const EdgeInsets.all(20),
      ),
      onPressed: () => onButtonClick(text),
      child: Text(
        text,
        style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final buttons = [
      '7', '8', '9', '/',
      '4', '5', '6', '*',
      '1', '2', '3', '-',
      'C', '0', '=', '+',
      'DEL'
    ];

    return Scaffold(
      appBar: AppBar(title: const Text('Calculator')),
      body: Column(
        children: [
          Expanded(
            child: Container(
              alignment: Alignment.bottomRight,
              padding: const EdgeInsets.all(24),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(input,
                      style: const TextStyle(
                          fontSize: 30, color: Colors.black54)),
                  const SizedBox(height: 10),
                  Text(output,
                      style: const TextStyle(
                          fontSize: 40,
                          fontWeight: FontWeight.bold,
                          color: Colors.black)),
                ],
              ),
            ),
          ),
          Expanded(
            flex: 2,
            child: GridView.builder(
              padding: const EdgeInsets.all(10),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 4,
                crossAxisSpacing: 10,
                mainAxisSpacing: 10,
              ),
              itemCount: buttons.length,
              itemBuilder: (context, index) {
                final button = buttons[index];
                final color = (button == '=')
                    ? Colors.orange
                    : (button == 'C' || button == 'DEL')
                    ? Colors.redAccent
                    : Colors.blueGrey;
                return buildButton(button, color);
              },
            ),
          ),
        ],
      ),
    );
  }
}
