package gridlerServer.servlets;

import com.google.gson.Gson;
import core.controllers.Game;
import gridlerServer.logic.UserManager;
import gridlerServer.models.GameLobbyItem;
import gridlerServer.models.GameUploadResponse;
import gridlerServer.models.MainLobbyResponse;
import gridlerServer.models.PlayerDefinition;
import gridlerServer.utils.ServletUtils;
import org.w3c.dom.Document;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.awt.*;
import java.io.*;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.logging.Level;

@WebServlet(name = "UploadGameFileServlet", urlPatterns = {"/uploadGameFile"})
@MultipartConfig
public class UploadGameFile extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Part filePart = request.getPart("file"); // Retrieves <input type="file" name="file">OutputStream out = null;

        OutputStream outputStream = null;
        InputStream filecontent = null;
        String message = "";
        boolean hasError = false;
        final PrintWriter writer = response.getWriter();

        try {
            File tmp = File.createTempFile("file",".tmp");
            outputStream = new FileOutputStream(tmp);
            filecontent = filePart.getInputStream();

            int read = 0;
            final byte[] bytes = new byte[1024];

            while ((read = filecontent.read(bytes)) != -1) {
                outputStream.write(bytes, 0, read);
            }

            Game game = new Game();
            game.loadGame(tmp);
            message = "Game loaded successfully";

        }
        catch (Exception exception) {
            hasError = true;
            message = exception.getMessage();

        }
        finally {

            Gson gson = new Gson();
            GameUploadResponse gur = new GameUploadResponse(message,hasError);
            String json = gson.toJson(gur);
            writer.println(json);
            writer.flush();

            if (outputStream != null) {
                outputStream.close();
            }
            if (filecontent != null) {
                filecontent.close();
            }
            if (writer != null) {
                writer.close();
            }
        }

    }

    /**
     * Extracts file name from HTTP header content-disposition
     */
    private String extractFileName(Part part) {
        String contentDisp = part.getHeader("content-disposition");
        String[] items = contentDisp.split(";");
        for (String s : items) {
            if (s.trim().startsWith("filename")) {
                return s.substring(s.indexOf("=") + 2, s.length()-1);
            }
        }
        return "";
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
