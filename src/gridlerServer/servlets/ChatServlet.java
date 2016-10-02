package gridlerServer.servlets;

import gridlerServer.Constants;
import gridlerServer.logic.GameManager;
import gridlerServer.utils.ServletUtils;
import gridlerServer.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 *
 * @author blecherl
 */
@WebServlet(name = "ChatServlet", urlPatterns = {"/gridlerServer"})
public class ChatServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        GameManager chatManager = ServletUtils.getChatManager(getServletContext());
        String username = SessionUtils.getUsername(request);
        if (username == null) {
            response.sendRedirect("app/index.html");
        }
        
        int chatVersion = ServletUtils.getIntParameter(request, Constants.CHAT_VERSION_PARAMETER);
        //logServerMessage("Server Chat version: " + chatManager.getVersion() + ", User '" + username + "' Chat version: " + chatVersion);

        if (chatVersion > Constants.INT_PARAMETER_ERROR) {
            try (PrintWriter out = response.getWriter()) {
//                List<GameManager.ChatEntry> chatEntries = chatManager.getChatEntries(chatVersion);
//                ChatAndVersion cav = new ChatAndVersion(chatEntries, chatManager.getVersion());
//                Gson gson = new Gson();
//                String jsonResponse = gson.toJson(cav);
//                logServerMessage(jsonResponse);
                out.print("yo");
                out.flush();
            }
        }
    }

    private void logServerMessage(String message){
        System.out.println(message);
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
