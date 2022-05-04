import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;
import java.net.UnknownHostException;
import EncryptDecrypt.Cypher;

public class Client {

	public static void main(String[] args) {
		// initialize socket and input output streams
		Socket socket = null;
		BufferedReader input = null;
		DataOutputStream out = null;
		try {
			socket = new Socket("127.0.0.1", 200);
			System.out.println("Connected");

			// takes input from terminal
			input = new BufferedReader(new InputStreamReader(System.in));

			// sends output to the socket
			out = new DataOutputStream(socket.getOutputStream());
		} catch (UnknownHostException u) {
			System.out.println(u);
		} catch (IOException i) {
			System.out.println(i);
		}
		// string to read message from input
		String line = "";
		String key = "";
		// keep reading until "Finish" is input
		while (!line.equalsIgnoreCase("finish")) {
			try {
				System.out.println("Write a message: ");
				line = input.readLine();
				System.out.println("Write a shift key: ");
				key = input.readLine();
				String str = Cypher.encrypt(line, Integer.parseInt(key)) + key;
				out.writeUTF(str);
			} catch (IOException i) {
				System.out.println(i);
			}
		}
		// close the connection
		try {
			input.close();
			out.close();
			socket.close();
		} catch (IOException i) {
			System.out.println(i);
		}
	}
}
