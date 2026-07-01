import http.server, os, webbrowser, threading, socket

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), "app"))
PORT = 8080
handler = http.server.SimpleHTTPRequestHandler
httpd = http.server.ThreadingHTTPServer(("0.0.0.0", PORT), handler)
httpd.timeout = 5
url = "http://localhost:" + str(PORT)
try:
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    local_ip = s.getsockname()[0]
    s.close()
    print("LAN access: http://" + local_ip + ":" + str(PORT))
except:
    pass
print("Design Proposal OS running at " + url)
threading.Timer(1.0, lambda: webbrowser.open(url)).start()
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped.")
