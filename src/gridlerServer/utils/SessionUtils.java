package gridlerServer.utils;

import gridlerServer.Constants;
import gridlerServer.models.User;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author blecherl
 */
public class SessionUtils {

    public static String getUsername (HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Object sessionAttribute = session != null ? session.getAttribute(Constants.USER_NAME) : null;
        return sessionAttribute != null ? sessionAttribute.toString() : null;
    }

    public static void clearSession (HttpServletRequest request) {
        request.getSession().invalidate();
    }

    public static User getUserFromRequest(HttpServletRequest request) {

        User user = null;
        Object nameObject = request.getParameter(Constants.USER_NAME);
        Object typeObject = request.getParameter(Constants.USER_TYPE);

        if (typeObject != null && nameObject != null) {
            user = new User();
            user.name = nameObject.toString();
            user.type = typeObject.toString();
        }

        return user;
    }

    public static User getUserFromSessionOnLogin(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        User user = null;
        Object nameObject = session != null ? session.getAttribute(Constants.USER_NAME) : null;
        Object typeObject = session != null ? session.getAttribute(Constants.USER_TYPE) : null;

        if (typeObject != null && nameObject != null) {
            user = new User();
            user.name = nameObject.toString();
            user.type = typeObject.toString();
        }

        return user;
    }

    /**
     * Get user from current session if exists
     * @param request
     * @return
     */
    public static User getCurrentSessionUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        User user = null;
        Object userObject = session != null ? session.getAttribute(Constants.USER_NAME) : null;

        if (userObject != null) {
            user = (User) userObject;
        }

        return user;
    }
}