package gridlerServer.utils;

import com.google.gson.Gson;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by david on 07/10/2016.
 */
public class ResponseUtils {
    public static void writeOutJsonObject(HttpServletResponse response, Object object) throws IOException {

        try (PrintWriter out = response.getWriter()) {

            Gson gson = new Gson();
            String jsonResponse = gson.toJson(object);
            out.print(jsonResponse);
            out.flush();
        }
    }
}
