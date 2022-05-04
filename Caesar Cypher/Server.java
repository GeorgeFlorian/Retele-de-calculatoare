import java.io.BufferedInputStream;
import java.io.DataInputStream;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import EncryptDecrypt.Cypher;

public class Server {
	public static void main(String[] args) {
		// initialize socket and input stream
		Socket socket = null;
		ServerSocket server = null;
		DataInputStream in = null;
		// starts server and waits for a connection
		try {
			server = new ServerSocket(200);
			System.out.println("Server started");
			System.out.println("Waiting for a client ...");

			socket = server.accept();
			System.out.println("Client accepted");

			// takes input from the client socket
			in = new DataInputStream(new BufferedInputStream(socket.getInputStream()));

			String encryptedMsg = "";

			// reads message from client until "Finish" is sent
			while (!encryptedMsg.equalsIgnoreCase("finish")) {
				encryptedMsg = in.readUTF();
				// iau keya
				String key = encryptedMsg.replaceAll("[^0-9]", "");
				System.out.println("Shift Key: " + key);

				encryptedMsg = encryptedMsg.replace(key, "");
				System.out.println("Encrypted Message: " + encryptedMsg);

				String decryptedMsg = Cypher.decrypt(encryptedMsg, Integer.parseInt(key));
				System.out.println("Decrypted Message: " + decryptedMsg);
			}
			System.out.println("Closing connection");

			// close connection
			socket.close();
			in.close();
		} catch (IOException i) {
			System.out.println(i);
		}
	}
}
