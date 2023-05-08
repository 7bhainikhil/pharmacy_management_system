


import java.io.IOException;	
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class stockServlet
 */
@WebServlet("/addstock")
public class stockServlet extends HttpServlet {
	private final static String query = "insert into stock(company,type,medicine,mfgdate,expdate,quantity,price) values(?,?,?,?,?,?,?)";
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		//pint writer add
		PrintWriter pw=res.getWriter();
		//content
		res.setContentType("text/html");
		// get the values
		String company = req.getParameter("companyName");
		String  type= req.getParameter("type");
	    String medicine = req.getParameter("medicineName");
	    String mfgdate = req.getParameter("mfgdate");
		String expdate = req.getParameter("expdate");
		int quantity = Integer.parseInt(req.getParameter("number"));
		float price = Float.parseFloat(req.getParameter("price"));
		
		//connect the jdbc driver
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (Exception e) {
			e.printStackTrace();
		}
		try(Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/medical","root","Sergio45#");
				PreparedStatement ps = con.prepareStatement(query);){
            //set the values
            ps.setString(1, company);
            ps.setString(2, type);
            ps.setString(3, medicine);
            ps.setString(4, mfgdate);
            ps.setString(5, expdate);
            ps.setInt(6, quantity);
            ps.setFloat(7, price);
            //execute the query
            int count = ps.executeUpdate();
            if(count==1) {
            	RequestDispatcher rd=req.getRequestDispatcher("addmedicine.html");
            	rd.include(req, res);
            	
            }
            else {
            	
    			pw.println("Something went wrong");
            	RequestDispatcher rd=req.getRequestDispatcher("contact.html");
            }
            
        }catch(SQLException se) {
            pw.println(se.getMessage());
            se.printStackTrace();
        }catch(Exception e) {
        	pw.println(e.getMessage());
            e.printStackTrace();
        }
        
        //close the stram
        pw.close();
	}
	@Override
		protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
			doGet(req,res);
		}
}

