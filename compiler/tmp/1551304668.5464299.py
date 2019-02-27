import traceback, sys
try:
    name = "Munis Isazade"
    
    
    print(name)
    
    z = 32
    
    print(z + 12)
    
    
except:
    exc_type, exc_obj, exc_tb = sys.exc_info()
    print("LINE:"+str(exc_tb.tb_lineno))
    print("ERROR:"+traceback.format_exc())