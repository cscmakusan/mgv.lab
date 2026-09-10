const COMMANDS = {
  help: `
<div class="green">Available network/security commands</div>
<div>  <b>route</b>     → Routing table / next-hop analysis</div>
<div>  <b>vpn</b>       → IPsec tunnel and Phase 1/2 status</div>
<div>  <b>firewall</b>  → Firewall policy inspection</div>
<div>  <b>sniff</b>     → Packet-flow capture sample</div>
<div>  <b>arp</b>       → ARP / neighbor table</div>
<div>  <b>system</b>    → FortiGate system information</div>
<div>  <b>topology</b>  → Network architecture view</div>
<div>  <b>certs</b>     → Certification matrix</div>
<div>  <b>clear</b>     → Clear terminal</div>`,
  route: `
<div class="cyan">mark@fortigate # get router info routing-table all</div>
<div>Routing table for VRF=0</div>
<div><span class="green">S*</span> 0.0.0.0/0 [10/0] via 203.0.113.1, wan1</div>
<div><span class="green">C</span>  10.10.10.0/24 is directly connected, internal</div>
<div><span class="green">C</span>  10.20.20.0/24 is directly connected, servers</div>
<div><span class="green">C</span>  10.50.50.0/24 is directly connected, iot</div>
<div><span class="green">[ OK ]</span> Route lookup: <b>RESOLVED</b></div>`,
  vpn: `
<div class="cyan">mark@fortigate # diagnose vpn tunnel list</div>
<div>name=SITE-MANILA  status=<span class="green">UP</span>  phase1=<span class="green">UP</span>  phase2=<span class="green">UP</span></div>
<div>name=SITE-BATANGAS status=<span class="green">UP</span>  phase1=<span class="green">UP</span>  phase2=<span class="green">UP</span></div>
<div>name=REMOTE-VPN   status=<span class="green">READY</span> authentication=SAML</div>
<div><span class="green">[ OK ]</span> IPsec: <b>ESTABLISHED</b></div>`,
  firewall: `
<div class="cyan">mark@fortigate # diagnose firewall iprope show</div>
<div>LAN → WAN        policy 101   <span class="green">ALLOW</span></div>
<div>LAN → SERVER     policy 110   <span class="green">ALLOW</span></div>
<div>VPN → SERVER     policy 205   <span class="green">ALLOW</span></div>
<div>IOT → LAN        policy 301   <span class="cyan">DENY</span></div>
<div><span class="green">[ OK ]</span> Policy engine: <b>ENFORCING</b></div>`,
  sniff: `
<div class="cyan">mark@fortigate # diagnose sniffer packet any 'host 10.20.20.15' 4 0 a</div>
<div>interfaces=[any] filters=[host 10.20.20.15]</div>
<div>12:41:08.214 IP 10.20.20.15.52341 &gt; 10.30.30.10.443: SYN</div>
<div>12:41:08.215 IP 10.30.30.10.443 &gt; 10.20.20.15.52341: SYN, ACK</div>
<div>12:41:08.216 IP 10.20.20.15.52341 &gt; 10.30.30.10.443: ACK</div>
<div><span class="green">[ OK ]</span> PACKET FLOW: <b>ESTABLISHED</b></div>`,
  arp: `
<div class="cyan">mark@fortigate # get system arp</div>
<div>Address          MAC Address          Interface</div>
<div>10.10.10.1      00:11:22:33:44:01    internal</div>
<div>10.10.10.25     00:11:22:33:44:25    internal</div>
<div>10.20.20.10     00:11:22:33:44:10    servers</div>
<div><span class="green">[ OK ]</span> ARP neighbors: <b>3 ACTIVE</b></div>`,
  system: `
<div class="cyan">mark@fortigate # get system status</div>
<div>Version: FortiOS v7.6.x</div>
<div>Hostname: FG-EDGE-01</div>
<div>Operation Mode: NAT</div>
<div>HA Status: <span class="green">PRIMARY</span></div>
<div>FortiManager: <span class="green">CONNECTED</span></div>
<div><span class="green">[ OK ]</span> System health: <b>OPERATIONAL</b></div>`,
  topology: `
<div class="cyan">mark@netsec # show network topology</div>
<div>INTERNET → <b>FORTIGATE</b> → CORE → VLAN 100 / VLAN 200 / VLAN 50</div>
<div>                   ├── MANAGEMENT</div>
<div>                   ├── WORKSTATIONS</div>
<div>                   └── AP / IOT</div>
<div><span class="green">[ OK ]</span> Segmentation: <b>ACTIVE</b></div>`,
  certs: `
<div class="cyan">mark@netsec # show credentials</div>
<div><span class="green">[✓]</span> CCNA</div><div><span class="green">[✓]</span> AZ-900</div>
<div><span class="green">[✓]</span> Fortinet NSE 4 · NSE 5 · NSE 6 · NSE 7</div>
<div><span class="green">[✓]</span> FCP · FCSS</div>`
};

// GoatCounter visitor counter. Create a GoatCounter site and replace the code below
// with the site code (the part before .goatcounter.com). Leave blank until configured.
const GOATCOUNTER_CODE = "";

function initVisitorCounter(){
  const top = document.getElementById("visitorCountTop");
  const metric = document.getElementById("visitorCount");
  if(!GOATCOUNTER_CODE){
    if(top) top.textContent = "--";
    if(metric) metric.textContent = "--";
    return;
  }

  const endpoint = `https://${GOATCOUNTER_CODE}.goatcounter.com/count`;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://gc.zgo.at/count.js";
  script.setAttribute("data-goatcounter", endpoint);
  document.head.appendChild(script);

  fetch(`https://${GOATCOUNTER_CODE}.goatcounter.com/counter/TOTAL.json`, {cache:"no-store"})
    .then(r => r.ok ? r.json() : Promise.reject(new Error("Visitor count unavailable")))
    .then(data => {
      const count = data && data.count ? data.count : "0";
      if(top) top.textContent = count;
      if(metric) metric.textContent = count;
    })
    .catch(() => {
      if(top) top.textContent = "--";
      if(metric) metric.textContent = "--";
    });
}

initVisitorCounter();

const output = document.getElementById("terminalOutput");
let input = document.getElementById("cliInput");
const history = [];
let historyIndex = 0;

function focusCLI(){ if(input) input.focus(); }
document.querySelector(".command-panel")?.addEventListener("click", focusCLI);
window.addEventListener("load", focusCLI);

function runCommand(raw){
  const cmd = raw.trim().toLowerCase();
  if(!cmd) return;
  history.push(cmd); historyIndex = history.length;

  const line = document.createElement("div");
  line.innerHTML = `<span class="muted">mark@netsec</span>:~$ ${escapeHtml(raw)}`;
  output.insertBefore(line, document.querySelector(".cli-prompt"));

  if(cmd === "clear"){
    [...output.children].forEach(el => { if(!el.classList.contains("cli-prompt")) el.remove(); });
  } else {
    const result = document.createElement("div");
    result.className = "command-result";
    result.innerHTML = COMMANDS[cmd] || `<span class="green">[ ERR ]</span> Unknown command: <b>${escapeHtml(cmd)}</b><br>Type <b>help</b> for available commands.`;
    output.insertBefore(result, document.querySelector(".cli-prompt"));
  }
  input.value = "";
  output.scrollTop = output.scrollHeight;
}

function escapeHtml(v){return v.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}

input?.addEventListener("keydown", e => {
  if(e.key === "Enter"){ runCommand(input.value); }
  else if(e.key === "ArrowUp"){
    e.preventDefault(); if(history.length){historyIndex=Math.max(0,historyIndex-1);input.value=history[historyIndex];}
  } else if(e.key === "ArrowDown"){
    e.preventDefault(); if(history.length){historyIndex=Math.min(history.length,historyIndex+1);input.value=history[historyIndex]||"";}
  }
});

function sendMail(e){
  e.preventDefault();
  const name=document.getElementById("name").value;
  const email=document.getElementById("email").value;
  const message=document.getElementById("message").value;
  const subject=encodeURIComponent("Portfolio Contact — "+name);
  const body=encodeURIComponent("Name: "+name+"\nEmail: "+email+"\n\n"+message);
  window.location.href="mailto:YOUR-EMAIL@example.com?subject="+subject+"&body="+body;
  return false;
}


function updateDashboard(){
  const d=new Date();
  const pad=n=>String(n).padStart(2,"0");
  const clock=document.getElementById("clock");
  if(clock) clock.textContent=`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  const cpu=document.getElementById("cpu"), mem=document.getElementById("mem");
  if(cpu) cpu.textContent=(21+Math.floor(Math.random()*9))+"%";
  if(mem) mem.textContent=(38+Math.floor(Math.random()*8))+"%";
}
updateDashboard(); setInterval(updateDashboard,1000);

function toggleCase(button){const card=button.closest(".professional-card");const panel=card.querySelector(".case-study");const open=panel.classList.toggle("open");button.textContent=open?"CLOSE CASE STUDY ↑":"VIEW CASE STUDY →";}
document.querySelectorAll(".filter-btn").forEach(btn=>{btn.addEventListener("click",()=>{document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));btn.classList.add("active");const filter=btn.dataset.filter;document.querySelectorAll(".professional-card").forEach(card=>card.classList.toggle("hidden",filter!=="all"&&card.dataset.category!==filter));});});
