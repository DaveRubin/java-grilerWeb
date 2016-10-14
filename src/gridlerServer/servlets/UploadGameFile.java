package gridlerServer.servlets;

import com.google.gson.Gson;
import core.controllers.Game;
import gridlerServer.logic.GameManager;
import gridlerServer.models.*;
import gridlerServer.utils.ResponseUtils;
import gridlerServer.utils.ServletUtils;
import gridlerServer.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.*;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

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
            File tmp = File.createTempFile("file", ".tmp");
            outputStream = new FileOutputStream(tmp);
            filecontent = filePart.getInputStream();

            int read = 0;
            final byte[] bytes = new byte[1024];

            while ((read = filecontent.read(bytes)) != -1) {
                outputStream.write(bytes, 0, read);
            }

            String createdBy = "None";

            User userFromSession = SessionUtils.getCurrentSessionUser(request);
            if (userFromSession != null) {
                createdBy = userFromSession.name;
            }

            Game game = new Game(createdBy);
            GameManager gameManager = ServletUtils.getGamesManager(getServletContext());

            game.onGameLoaded.addListener(() -> {
                try {
                    gameManager.addGame(game);
                    writeResponse(response, "Game loaded successfully by " + game.createdBy, false);
                }
                catch (Exception e) {
                    try {
                        writeResponse(response, e.getMessage(), true);
                    } catch (IOException e1) {
                        e1.printStackTrace();
                    }
                }
            });

            game.loadGame(tmp);

        } catch (Exception exception) {
            writeResponse(response, exception.getMessage(), true);

        } finally {


            if (outputStream != null) {
                outputStream.close();
            }
            if (filecontent != null) {
                filecontent.close();
            }

        }

    }

    private void writeResponse(HttpServletResponse response, String message, boolean hasError) throws IOException {
        GameUploadResponse gur = new GameUploadResponse(message, hasError);
        ResponseUtils.writeOutJsonObject(response, gur);

    }

    /**
     * Extracts file name from HTTP header content-disposition
     */
    private String extractFileName(Part part) {
        String contentDisp = part.getHeader("content-disposition");
        String[] items = contentDisp.split(";");
        for (String s : items) {
            if (s.trim().startsWith("filename")) {
                return s.substring(s.indexOf("=") + 2, s.length() - 1);
            }
        }
        return "";
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">

    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request  servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request  servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException      if an I/O error occurs
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
