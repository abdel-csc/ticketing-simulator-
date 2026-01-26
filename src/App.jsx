import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, User, Star, Sparkles, Zap } from 'lucide-react';

const TICKET_SCENARIOS = [
  // Password & Account Issues
  {
    user: "Bob",
    age: 70,
    issue: "When I leave my computer for a while, it turns off by itself.",
    priority: "high",
    difficulty: "easy",
    keywords: ["sleep", "power", "settings", "display"],
    mockResponses: {
      default: "I'm sorry, I don't understand. Could you explain that more simply?",
      keywords: {
        "sleep|power|settings|display|screen": [
          "Settings? Where do I find that? Is it a button on my keyboard?",
          "Okay, I think I see Settings. What do I click on next?",
          "Oh! I found the sleep settings. This makes sense now. Thank you so much for your patience!"
        ],
        "start|menu|windows|click|search": [
          "The start menu... is that the Windows button in the corner?",
          "I clicked it! Now I see a lot of things. Which one should I look for?",
          "Got it! I can see where to go from here. Thank you!"
        ]
      }
    }
  },
  {
    user: "Karen",
    age: 45,
    issue: "I've been locked out of my account after trying to log in too many times.",
    priority: "high",
    difficulty: "easy",
    keywords: ["locked", "unlock", "account", "reset"],
    mockResponses: {
      default: "I really need to access my account. What should I do?",
      keywords: {
        "unlock|reset|wait|time": [
          "How long do I have to wait before I can try again?",
          "Is there any way to speed this up? I have urgent work to do.",
          "Perfect! I can log in now. Thank you for the quick help!"
        ],
        "password|change|temporary": [
          "Will I need to change my password?",
          "Okay, I'll set a new one right away.",
          "Got it! New password works. Thanks so much!"
        ]
      }
    }
  },
  {
    user: "David",
    age: 33,
    issue: "My password expired and now I can't access any of my work applications.",
    priority: "high",
    difficulty: "easy",
    keywords: ["password", "expired", "reset", "change"],
    mockResponses: {
      default: "I can't get into anything. This is blocking my whole day.",
      keywords: {
        "reset|change|new|update": [
          "Where do I go to reset it?",
          "Do I need to follow any specific requirements for the new password?",
          "Done! Everything's accessible again. I appreciate your help!"
        ],
        "link|email|portal": [
          "I don't see any email. Should I check spam?",
          "Found it! Clicking the reset link now.",
          "That worked! I'm back in. Thank you!"
        ]
      }
    }
  },

  // Printer Issues
  {
    user: "Angela",
    age: 52,
    issue: "The printer is showing 'offline' and won't print my documents.",
    priority: "medium",
    difficulty: "easy",
    keywords: ["printer", "offline", "connection", "network"],
    mockResponses: {
      default: "I've tried everything but it still won't print.",
      keywords: {
        "restart|reboot|power|turn": [
          "Should I restart the printer or my computer?",
          "Okay, restarting now. Give me a second.",
          "It's working! The printer is back online. Thanks!"
        ],
        "network|wifi|connection|cable": [
          "It's connected via wifi. Should I check the network?",
          "Let me make sure the cable is plugged in properly.",
          "Reconnecting to the network fixed it! Thank you!"
        ]
      }
    }
  },
  {
    user: "Tom",
    age: 55,
    issue: "The printer won't connect to my laptop. It worked yesterday but now it's not showing up.",
    priority: "medium",
    difficulty: "easy",
    keywords: ["printer", "connection", "network", "driver", "restart"],
    mockResponses: {
      default: "I'm not sure what to try next.",
      keywords: {
        "restart|reboot|power|turn|off|on": [
          "Should I restart the printer or my laptop first?",
          "Okay, I restarted both. Let me check if it shows up now.",
          "It's showing up now! The printer is connected. Thanks for your help!"
        ],
        "wifi|network|connection|router": [
          "Could it be a wifi issue? Other devices are connected fine.",
          "The printer shows wifi lights on. Does that mean it's connected?",
          "Ah, reconnecting to wifi worked! The printer is back online. Thank you!"
        ],
        "driver|install|software|add|reinstall": [
          "Do I need to reinstall the printer driver?",
          "Where do I find the printer software to reinstall it?",
          "Reinstalling the driver fixed it! The printer is working perfectly now. Thanks!"
        ]
      }
    }
  },
  {
    user: "Patricia",
    age: 48,
    issue: "My printouts are coming out blank even though I can see the document on screen.",
    priority: "medium",
    difficulty: "medium",
    keywords: ["printer", "blank", "toner", "ink", "cartridge"],
    mockResponses: {
      default: "The printer sounds like it's working but nothing comes out.",
      keywords: {
        "toner|ink|cartridge|replace": [
          "How do I check if the toner is empty?",
          "Where can I get a replacement cartridge?",
          "Replaced the toner and it's printing perfectly! Thanks!"
        ],
        "clean|nozzle|head|maintenance": [
          "Is there a cleaning cycle I should run?",
          "How do I access the maintenance menu?",
          "The cleaning cycle worked! Print quality is back to normal. Thank you!"
        ]
      }
    }
  },

  // Email Issues
  {
    user: "Marcus",
    age: 42,
    issue: "My email is running very slowly and sometimes freezes when I try to send attachments.",
    priority: "medium",
    difficulty: "medium",
    keywords: ["attachment", "size", "cache", "outlook", "email"],
    mockResponses: {
      default: "Hmm, I'm not following. Could you clarify?",
      keywords: {
        "attachment|size|large|mb|compress|link|drive": [
          "How big is too big for an email attachment?",
          "Should I use a cloud service instead? Which one do you recommend?",
          "That makes sense! I'll use the file sharing link. Email is working smoothly now. Thanks!"
        ],
        "cache|clear|data|storage|reset": [
          "Will clearing the cache delete my emails?",
          "Okay, I'm clearing it now. Should I see a difference right away?",
          "Wow, that really sped things up! Email is much faster now. Thank you!"
        ],
        "outlook|email|program|app": [
          "I'm using Outlook. Is this a common problem with it?",
          "Should I update Outlook or try restarting the program?",
          "Restarting Outlook fixed it! Everything's running smoothly. I appreciate the help."
        ]
      }
    }
  },
  {
    user: "Rachel",
    age: 36,
    issue: "I'm not receiving any emails. I can send them but nothing is coming in.",
    priority: "high",
    difficulty: "medium",
    keywords: ["email", "receive", "inbox", "server"],
    mockResponses: {
      default: "I'm worried I'm missing important messages.",
      keywords: {
        "server|settings|configuration": [
          "Could this be a server issue?",
          "Are the server settings correct on my end?",
          "Fixing the server settings worked! Emails are flowing in now. Thanks!"
        ],
        "full|storage|quota|space": [
          "Is my mailbox full? How do I check?",
          "How much space do I have left?",
          "Cleared out some old emails and it's working again! Thank you!"
        ]
      }
    }
  },
  {
    user: "Steven",
    age: 29,
    issue: "I keep getting a 'Cannot connect to server' error when trying to access my email.",
    priority: "high",
    difficulty: "medium",
    keywords: ["server", "connection", "error", "email"],
    mockResponses: {
      default: "I've tried restarting but still can't connect.",
      keywords: {
        "server|outage|down|status": [
          "Is the email server down for everyone?",
          "Where can I check the server status?",
          "Good to know it's being fixed. I'll check back later. Thanks!"
        ],
        "settings|configuration|port": [
          "Should I check my email settings?",
          "What's the correct server address?",
          "Updated the settings and it's working! Thank you!"
        ]
      }
    }
  },

  // Network & Connectivity
  {
    user: "Sarah",
    age: 35,
    issue: "I can't access the shared drive. It says 'Access Denied' when I try to open it.",
    priority: "high",
    difficulty: "medium",
    keywords: ["permissions", "access", "admin", "network", "drive"],
    mockResponses: {
      default: "I'm not sure what you mean. Can you be more specific?",
      keywords: {
        "permission|access|admin|rights|it|contact": [
          "How long will it take to fix the permissions?",
          "Okay, should I restart my computer while you work on this?",
          "Perfect! I can access it now. Thanks for the quick help!"
        ],
        "restart|reboot|log|off": [
          "Do I need to restart? I have a lot of work open right now.",
          "Alright, restarting now. Hopefully this fixes it.",
          "That did it! The shared drive is accessible again. Thank you!"
        ],
        "network|vpn|connection|wifi": [
          "I am connected to the VPN. Could that be causing issues?",
          "Let me check my network connection... it seems fine on my end.",
          "Oh, reconnecting to the network worked! I can see the drive now. Thanks!"
        ]
      }
    }
  },
  {
    user: "James",
    age: 41,
    issue: "The wifi keeps disconnecting every few minutes.",
    priority: "medium",
    difficulty: "medium",
    keywords: ["wifi", "disconnect", "network", "connection"],
    mockResponses: {
      default: "It's really disruptive. I keep losing my work.",
      keywords: {
        "restart|router|modem|reboot": [
          "Should I restart the router?",
          "Okay, unplugging it now. How long should I wait?",
          "Restarting the router fixed it! Connection is stable now. Thanks!"
        ],
        "driver|update|network|adapter": [
          "Could it be a driver issue?",
          "How do I update my network adapter?",
          "Updated the driver and it's working perfectly! Thank you!"
        ]
      }
    }
  },
  {
    user: "Michelle",
    age: 38,
    issue: "I can connect to wifi but can't access any websites.",
    priority: "high",
    difficulty: "medium",
    keywords: ["internet", "wifi", "dns", "browser"],
    mockResponses: {
      default: "It says I'm connected but nothing loads.",
      keywords: {
        "dns|server|address": [
          "What's DNS? Is that causing the problem?",
          "How do I change the DNS settings?",
          "Changed the DNS and everything's loading now! Thanks so much!"
        ],
        "browser|cache|clear|cookies": [
          "Should I try a different browser?",
          "Let me clear my browser cache.",
          "Clearing the cache worked! All sites are accessible now. Thank you!"
        ]
      }
    }
  },

  // Software Issues
  {
    user: "Daniel",
    age: 44,
    issue: "Excel keeps crashing whenever I try to open large spreadsheets.",
    priority: "medium",
    difficulty: "medium",
    keywords: ["excel", "crash", "freeze", "spreadsheet"],
    mockResponses: {
      default: "I'm losing work every time it crashes.",
      keywords: {
        "update|version|install": [
          "Is my Excel up to date?",
          "Should I reinstall the program?",
          "Updated Excel and it's working great now! Thanks!"
        ],
        "memory|ram|performance": [
          "Could this be a memory issue?",
          "How much RAM does my computer have?",
          "Closing other programs helped! Excel is running smoothly. Thank you!"
        ]
      }
    }
  },
  {
    user: "Emily",
    age: 27,
    issue: "I need to install new software but I'm getting a 'permission denied' error.",
    priority: "medium",
    difficulty: "easy",
    keywords: ["install", "software", "permission", "admin"],
    mockResponses: {
      default: "I can't install anything on my computer.",
      keywords: {
        "admin|administrator|rights|permission": [
          "Do I need admin rights to install this?",
          "How do I get administrator access?",
          "Got it! The software is installing now. Thanks for your help!"
        ],
        "request|approval|ticket": [
          "Should I submit a request for this?",
          "How long does approval usually take?",
          "Perfect! It's approved and installing. Thank you!"
        ]
      }
    }
  },
  {
    user: "Brian",
    age: 50,
    issue: "My computer is running extremely slow and programs take forever to open.",
    priority: "medium",
    difficulty: "medium",
    keywords: ["slow", "performance", "speed", "computer"],
    mockResponses: {
      default: "Everything is lagging. It's really frustrating.",
      keywords: {
        "restart|reboot|turn": [
          "I haven't restarted in a while. Should I try that?",
          "Okay, restarting now.",
          "Much faster after the restart! Thanks for the tip!"
        ],
        "virus|malware|scan|antivirus": [
          "Could it be a virus?",
          "Should I run a security scan?",
          "The scan found some issues! Removing them now. Thank you!"
        ],
        "disk|space|storage|cleanup": [
          "How do I check my disk space?",
          "My hard drive is almost full. What should I delete?",
          "Freed up space and it's running much better! I appreciate your help!"
        ]
      }
    }
  },

  // Security Issues
  {
    user: "Jennifer",
    age: 28,
    issue: "I think I clicked on a suspicious link in an email. Should I be worried?",
    priority: "high",
    difficulty: "hard",
    keywords: ["phishing", "malware", "scan", "password", "security"],
    mockResponses: {
      default: "I'm really worried about this. What should I do?",
      keywords: {
        "password|change|reset|update|secure": [
          "Should I change my password right now?",
          "Okay, I'm changing it. Should I change other passwords too?",
          "Done! I changed my passwords. That's reassuring. Thanks for your help!"
        ],
        "scan|malware|virus|antivirus|check": [
          "How do I run a security scan?",
          "The scan is running now. What happens if it finds something?",
          "The scan came back clean! That's a relief. Thank you for walking me through this!"
        ],
        "phishing|scam|suspicious|link|email": [
          "How can I tell if it was actually malicious?",
          "What information could they have stolen from that link?",
          "Okay, I feel much better now. I'll be more careful next time. Thanks!"
        ]
      }
    }
  },
  {
    user: "Kevin",
    age: 39,
    issue: "I'm getting a security warning that my Windows Defender is out of date.",
    priority: "high",
    difficulty: "easy",
    keywords: ["security", "windows", "defender", "antivirus", "update"],
    mockResponses: {
      default: "Is my computer at risk?",
      keywords: {
        "update|install|download": [
          "How do I update Windows Defender?",
          "Will this take long to install?",
          "Updated successfully! Security is back on track. Thanks!"
        ],
        "scan|check|virus": [
          "Should I run a scan after updating?",
          "How long does a full scan take?",
          "Scan completed, everything looks good! Thank you!"
        ]
      }
    }
  },

  // Hardware Issues
  {
    user: "Lisa",
    age: 31,
    issue: "My laptop won't turn on. The screen stays black when I press the power button.",
    priority: "high",
    difficulty: "hard",
    keywords: ["laptop", "power", "screen", "black", "boot"],
    mockResponses: {
      default: "I'm panicking. I have important files on here!",
      keywords: {
        "power|battery|charge|plug": [
          "Is it plugged in? Let me check the power cord.",
          "The charging light is on but nothing's happening.",
          "It's working! Had to hold the power button longer. Thank you!"
        ],
        "hard|reset|force|restart": [
          "How do I do a hard reset?",
          "Should I remove the battery?",
          "The hard reset worked! It's booting up now. Thanks so much!"
        ]
      }
    }
  },
  {
    user: "Greg",
    age: 57,
    issue: "My mouse stopped working. The cursor won't move at all.",
    priority: "medium",
    difficulty: "easy",
    keywords: ["mouse", "cursor", "not working", "frozen"],
    mockResponses: {
      default: "I can't click on anything. This is a problem.",
      keywords: {
        "battery|replace|charge": [
          "It's a wireless mouse. Could the battery be dead?",
          "Let me try replacing the batteries.",
          "New batteries fixed it! Mouse is working perfectly. Thanks!"
        ],
        "plug|usb|reconnect|port": [
          "Should I unplug it and plug it back in?",
          "Let me try a different USB port.",
          "Different port worked! Cursor is moving again. Thank you!"
        ]
      }
    }
  },
  {
    user: "Nancy",
    age: 46,
    issue: "My keyboard is typing the wrong characters. Some keys aren't working at all.",
    priority: "medium",
    difficulty: "medium",
    keywords: ["keyboard", "keys", "typing", "characters"],
    mockResponses: {
      default: "I can barely type anything correctly.",
      keywords: {
        "clean|dust|debris|stuck": [
          "Could there be something stuck under the keys?",
          "How do I clean the keyboard safely?",
          "Cleaned it out and it's working great! Thanks for the advice!"
        ],
        "driver|software|update": [
          "Is this a software issue?",
          "How do I update the keyboard driver?",
          "Updated the driver and all keys work now! Thank you!"
        ]
      }
    }
  },

  // VPN & Remote Access
  {
    user: "Amanda",
    age: 34,
    issue: "I can't connect to the company VPN from home.",
    priority: "high",
    difficulty: "medium",
    keywords: ["vpn", "connection", "remote", "access"],
    mockResponses: {
      default: "I need to access work files but the VPN won't connect.",
      keywords: {
        "credentials|username|password": [
          "Could my VPN password be wrong?",
          "Where do I find my VPN credentials?",
          "Got the right credentials and it connected! Thank you!"
        ],
        "server|address|settings": [
          "Is the VPN server down?",
          "What's the correct server address?",
          "Fixed the server settings and I'm connected! Thanks!"
        ]
      }
    }
  },
  {
    user: "Chris",
    age: 40,
    issue: "Remote desktop keeps disconnecting in the middle of my work.",
    priority: "high",
    difficulty: "medium",
    keywords: ["remote", "desktop", "disconnect", "connection"],
    mockResponses: {
      default: "This is really disruptive. I keep losing my session.",
      keywords: {
        "internet|connection|bandwidth": [
          "Could it be my internet connection?",
          "How can I check my connection speed?",
          "Switched to a wired connection and it's stable now! Thanks!"
        ],
        "settings|timeout|session": [
          "Is there a timeout setting?",
          "Can I adjust the session length?",
          "Adjusted the settings and it's working perfectly! Thank you!"
        ]
      }
    }
  },

  // Mobile & Phone Issues
  {
    user: "Samantha",
    age: 32,
    issue: "I can't sync my work email to my phone.",
    priority: "medium",
    difficulty: "medium",
    keywords: ["phone", "email", "sync", "mobile"],
    mockResponses: {
      default: "I need to check emails on the go but it won't set up.",
      keywords: {
        "settings|server|configure": [
          "What settings do I need to enter?",
          "Is there a guide for mobile setup?",
          "Got it configured! Email is syncing now. Thanks!"
        ],
        "app|outlook|mail": [
          "Which app should I use for work email?",
          "Should I download Outlook mobile?",
          "Downloaded the right app and it's working! Thank you!"
        ]
      }
    }
  },
  {
    user: "Robert",
    age: 53,
    issue: "My work phone isn't receiving calls but I can make outgoing calls.",
    priority: "high",
    difficulty: "medium",
    keywords: ["phone", "calls", "incoming", "voip"],
    mockResponses: {
      default: "People are telling me they can't reach me.",
      keywords: {
        "forward|divert|settings": [
          "Could call forwarding be enabled by accident?",
          "How do I check the forwarding settings?",
          "Turned off call forwarding and it's working! Thanks!"
        ],
        "network|signal|connection": [
          "Is the phone network working normally?",
          "Should I restart my phone?",
          "Restarted and calls are coming through! Thank you!"
        ]
      }
    }
  }
];

const AI_PROVIDERS = {
  groq: {
    name: "Groq (Fast & Free)",
    models: ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"],
    defaultModel: "llama-3.1-8b-instant",
    setup: "Get your API key at console.groq.com",
    cost: "Free tier: 30 requests/min, 14,400/day"
  },
  huggingface: {
    name: "Hugging Face",
    models: ["meta-llama/Llama-3.2-3B-Instruct", "microsoft/Phi-3-mini-4k-instruct", "mistralai/Mistral-7B-Instruct-v0.3"],
    defaultModel: "meta-llama/Llama-3.2-3B-Instruct",
    setup: "Get your API key at huggingface.co/settings/tokens",
    cost: "Free tier: Community-hosted models"
  },
  anthropic: {
    name: "Anthropic Claude",
    models: ["claude-sonnet-4-20250514", "claude-haiku-4-20250514"],
    defaultModel: "claude-sonnet-4-20250514",
    setup: "Get your API key at console.anthropic.com",
    cost: "$5 free credits (~100-200 conversations)"
  },
  openai: {
    name: "OpenAI GPT",
    models: ["gpt-4o-mini", "gpt-3.5-turbo"],
    defaultModel: "gpt-4o-mini",
    setup: "Get your API key at platform.openai.com",
    cost: "$5 free credits for new users"
  }
};

export default function App() {
  const [aiMode, setAiMode] = useState('mock');
  const [aiProvider, setAiProvider] = useState('groq');
  const [aiModel, setAiModel] = useState(AI_PROVIDERS.groq.defaultModel);
  const [view, setView] = useState('menu');
  const [activeTickets, setActiveTickets] = useState([]);
  const [closedTickets, setClosedTickets] = useState([]);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [ticketClosed, setTicketClosed] = useState(false);
  const [rating, setRating] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiSetup, setShowApiSetup] = useState(false);
  const [responseIndex, setResponseIndex] = useState({});

  useEffect(() => {
    generateTickets();
    const savedKeys = {
      groq: localStorage.getItem('groq_api_key'),
      huggingface: localStorage.getItem('huggingface_api_key'),
      anthropic: localStorage.getItem('anthropic_api_key'),
      openai: localStorage.getItem('openai_api_key')
    };

    if (savedKeys[aiProvider]) {
      setApiKey(savedKeys[aiProvider]);
    }
  }, []);

  const generateTickets = () => {
    const shuffled = [...TICKET_SCENARIOS].sort(() => Math.random() - 0.5);
    const tickets = shuffled.slice(0, 3).map((scenario) => ({
      id: `TKT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      ...scenario,
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString()
    }));
    setActiveTickets(tickets);
  };

  const openTicket = (ticket) => {
    setCurrentTicket(ticket);
    setConversation([{
      role: 'system',
      content: `Ticket #${ticket.id} - Priority: ${ticket.priority.toUpperCase()}\n\n${ticket.user} (${ticket.age} years old): "${ticket.issue}"`
    }]);
    setView('chat');
    setTicketClosed(false);
    setRating(null);
    setResponseIndex({});
  };

  const getMockResponse = (ticket, userMessage) => {
    const mockData = ticket.mockResponses;
    const lowerMessage = userMessage.toLowerCase();

    const progressKey = `${ticket.id}-progress`;
    const currentProgress = responseIndex[progressKey] || 0;

    const helpfulKeywords = ['try', 'click', 'go to', 'open', 'press', 'settings', 'help', 'can', 'will', 'should', 'let me', 'follow', 'step'];
    const isHelpful = helpfulKeywords.some(keyword => lowerMessage.includes(keyword));

    const resolutionKeywords = ['thank', 'thanks', 'solved', 'fixed', 'worked', 'resolved', 'perfect', 'great', 'awesome', 'appreciate'];
    const isResolution = resolutionKeywords.some(keyword => lowerMessage.includes(keyword));

    if (isHelpful && currentProgress < 2) {
      setResponseIndex(prev => ({
        ...prev,
        [progressKey]: currentProgress + 1
      }));
    }

    for (const [pattern, responses] of Object.entries(mockData.keywords)) {
      const keywords = pattern.split('|');
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {

        if (pattern.includes('thank') && currentProgress < 1 && !isResolution) {
          return mockData.default;
        }

        const responseIndex = Math.min(currentProgress, responses.length - 1);
        return responses[responseIndex];
      }
    }

    if (currentProgress >= 2) {
      for (const [pattern, responses] of Object.entries(mockData.keywords)) {
        if (pattern.includes('thank')) {
          return responses[responses.length - 1];
        }
      }
    }

    return mockData.default;
  };

  const callGroqAPI = async (systemPrompt, messages) => {
    const fullMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: aiModel,
        messages: fullMessages,
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.choices[0].message.content;
  };

  const callHuggingFaceAPI = async (systemPrompt, messages) => {
    const fullPrompt = `${systemPrompt}\n\n` + messages.map(m =>
      `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
    ).join('\n\n');

    const response = await fetch(`https://api-inference.huggingface.co/models/${aiModel}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: fullPrompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          return_full_text: false
        }
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error);
    return data[0].generated_text;
  };

  const callAnthropicAPI = async (systemPrompt, messages) => {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: aiModel,
        max_tokens: 1000,
        system: systemPrompt,
        messages: messages
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.content[0].text;
  };

  const callGoogleAPI = async (systemPrompt, messages) => {
    // Google API removed - not working reliably with free tier
    throw new Error("Google API is currently unavailable. Please use Groq or Hugging Face instead.");
  };

  const callOpenAIAPI = async (systemPrompt, messages) => {
    const fullMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: aiModel,
        messages: fullMessages,
        max_tokens: 1000
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.choices[0].message.content;
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || loading) return;

    const newMessage = { role: 'agent', content: userInput };
    setConversation(prev => [...prev, newMessage]);
    const currentInput = userInput;
    setUserInput('');
    setLoading(true);

    try {
      let customerResponse;

      if (aiMode === 'mock') {
        await new Promise(resolve => setTimeout(resolve, 800));
        customerResponse = getMockResponse(currentTicket, currentInput);
      } else {
        const systemPrompt = `You are roleplaying as ${currentTicket.user}, a ${currentTicket.age}-year-old person with a tech support issue: "${currentTicket.issue}". 

Your personality: ${currentTicket.age > 60 ? "You're not very tech-savvy and need patient, simple explanations. You might get confused by jargon." : currentTicket.age > 40 ? "You have moderate tech knowledge but appreciate clear instructions." : "You're fairly comfortable with technology but need help with this specific issue."}

Respond naturally to the help desk agent's message. You can:
- Ask follow-up questions if something is unclear
- Express gratitude if they're helpful
- Request screenshots or visual guides if needed
- Say the issue is resolved if their solution makes sense
- Show frustration if they're unhelpful or condescending

If the agent has provided a good solution and you understand it, thank them and indicate you'll try it. After 2-3 helpful exchanges, you can say the issue is resolved.

Keep responses conversational and under 100 words. Don't break character.`;

        const apiMessages = conversation
          .filter(msg => msg.role !== 'system')
          .map(msg => ({
            role: msg.role === 'agent' ? 'user' : 'assistant',
            content: msg.content
          }))
          .concat([{ role: 'user', content: currentInput }]);


        if (aiProvider === 'groq') {
          customerResponse = await callGroqAPI(systemPrompt, apiMessages);
        } else if (aiProvider === 'huggingface') {
          customerResponse = await callHuggingFaceAPI(systemPrompt, apiMessages);
        } else if (aiProvider === 'anthropic') {
          customerResponse = await callAnthropicAPI(systemPrompt, apiMessages);
        } else if (aiProvider === 'google') {
          customerResponse = await callGoogleAPI(systemPrompt, apiMessages);
        } else if (aiProvider === 'openai') {
          customerResponse = await callOpenAIAPI(systemPrompt, apiMessages);
        }

        // Ensure we have a valid response
        if (!customerResponse || typeof customerResponse !== 'string') {
          throw new Error('Invalid response from AI provider');
        }
      }

      setConversation(prev => [...prev, { role: 'customer', content: customerResponse }]);

      if (customerResponse && customerResponse.toLowerCase &&
        (customerResponse.toLowerCase().includes('resolved') ||
          (customerResponse.toLowerCase().includes('thank') &&
            (customerResponse.toLowerCase().includes('worked') ||
              customerResponse.toLowerCase().includes('fixed') ||
              customerResponse.toLowerCase().includes('solved'))))) {
        setTimeout(() => evaluatePerformance(), 1500);
      }

    } catch (error) {
      console.error('Error:', error);
      setConversation(prev => [...prev, {
        role: 'customer',
        content: `Sorry, I'm having trouble responding right now. Error: ${error.message}`
      }]);
    }

    setLoading(false);
  };

  const evaluatePerformance = async () => {
    setLoading(true);

    try {
      let evaluation;

      if (aiMode === 'mock') {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const agentMessages = conversation.filter(m => m.role === 'agent');
        const hasGoodKeywords = agentMessages.some(m =>
          m.content.toLowerCase().includes('help') ||
          m.content.toLowerCase().includes('let me') ||
          m.content.toLowerCase().includes('i can') ||
          m.content.toLowerCase().includes('try')
        );

        const rating = agentMessages.length >= 2 && hasGoodKeywords ? 4 : 3;
        const feedbacks = [
          "Good job! You provided clear instructions and maintained professionalism.",
          "Well done. Your explanations were helpful and easy to follow.",
          "Nice work! You showed patience and addressed the user's concerns.",
          "Solid performance. Consider providing more step-by-step guidance.",
          "Good effort. Try to check for understanding more frequently."
        ];

        evaluation = {
          rating,
          feedback: feedbacks[Math.floor(Math.random() * feedbacks.length)]
        };
      } else {
        const systemPrompt = `You are evaluating a help desk agent's performance. Rate them 1-5 stars based on:
- Professionalism and tone
- Clarity of explanation
- Problem-solving effectiveness
- Patience and empathy
- Technical accuracy

Provide a rating (1-5) and brief feedback (2-3 sentences). Format your response as JSON:
{"rating": 4, "feedback": "Good explanation but could be more concise."}`;

        const conversationText = `Issue: ${currentTicket.issue}\n\nConversation:\n${conversation.filter(m => m.role !== 'system').map(m => `${m.role}: ${m.content}`).join('\n\n')}`;

        let responseText;
        if (aiProvider === 'groq') {
          responseText = await callGroqAPI(systemPrompt, [{ role: 'user', content: conversationText }]);
        } else if (aiProvider === 'huggingface') {
          responseText = await callHuggingFaceAPI(systemPrompt, [{ role: 'user', content: conversationText }]);
        } else if (aiProvider === 'anthropic') {
          responseText = await callAnthropicAPI(systemPrompt, [{ role: 'user', content: conversationText }]);
        } else if (aiProvider === 'google') {
          responseText = await callGoogleAPI(systemPrompt, [{ role: 'user', content: conversationText }]);
        } else if (aiProvider === 'openai') {
          responseText = await callOpenAIAPI(systemPrompt, [{ role: 'user', content: conversationText }]);
        }

        const text = responseText.replace(/```json|```/g, '').trim();
        evaluation = JSON.parse(text);
      }

      setRating(evaluation);
      setTicketClosed(true);

      setClosedTickets(prev => [...prev, {
        ...currentTicket,
        closedAt: new Date().toISOString(),
        rating: evaluation.rating,
        feedback: evaluation.feedback
      }]);

      setActiveTickets(prev => prev.filter(t => t.id !== currentTicket.id));

    } catch (error) {
      console.error('Error evaluating:', error);
      setRating({ rating: 3, feedback: "Ticket closed successfully." });
      setTicketClosed(true);
    }

    setLoading(false);
  };

  const closeTicketManually = () => {
    evaluatePerformance();
  };

  const switchToRealAI = () => {
    const savedKey = localStorage.getItem(`${aiProvider}_api_key`);
    if (savedKey) {
      setApiKey(savedKey);
      setAiMode('real');
    } else {
      setShowApiSetup(true);
    }
  };

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem(`${aiProvider}_api_key`, apiKey);
      setShowApiSetup(false);
      setAiMode('real');
    }
  };

  const handleProviderChange = (provider) => {
    setAiProvider(provider);
    setAiModel(AI_PROVIDERS[provider].defaultModel);
    const savedKey = localStorage.getItem(`${provider}_api_key`);
    if (savedKey) {
      setApiKey(savedKey);
    } else {
      setApiKey('');
    }
  };

  const clearAllApiKeys = () => {
    localStorage.removeItem('groq_api_key');
    localStorage.removeItem('huggingface_api_key');
    localStorage.removeItem('anthropic_api_key');
    localStorage.removeItem('openai_api_key');
    setApiKey('');
    setAiMode('mock');
    alert('All API keys have been cleared from your browser.');
  };

  const clearCurrentApiKey = () => {
    setApiKey('');
    setShowApiSetup(true);
  };

  if (showApiSetup) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-gray-800 rounded-lg p-8 border border-gray-700">
          <h1 className="text-2xl font-bold mb-4 text-blue-400 flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            {aiMode === 'real' ? 'Change AI Provider' : 'Enable Real AI Mode'}
          </h1>

          <div className="mb-4 bg-yellow-900/30 p-3 rounded-lg border border-yellow-700">
            <p className="text-xs text-yellow-200 font-semibold mb-1">⚠️ Security Notice</p>
            <p className="text-xs text-gray-300">
              Your API key will be stored locally in your browser and sent directly to the AI provider.
              Use free tier keys only and never share your key with others.
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Select AI Provider</label>
            <select
              value={aiProvider}
              onChange={(e) => handleProviderChange(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="groq">{AI_PROVIDERS.groq.name} (Recommended)</option>
              <option value="huggingface">{AI_PROVIDERS.huggingface.name}</option>
              <option value="anthropic">{AI_PROVIDERS.anthropic.name}</option>
              <option value="openai">{AI_PROVIDERS.openai.name}</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Select Model</label>
            <select
              value={aiModel}
              onChange={(e) => setAiModel(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
            >
              {AI_PROVIDERS[aiProvider].models.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key..."
              className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            {localStorage.getItem(`${aiProvider}_api_key`) && (
              <p className="text-xs text-green-400 mt-1">✓ Saved key found for this provider</p>
            )}
          </div>

          <button
            onClick={saveApiKey}
            disabled={!apiKey.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-2 rounded font-semibold mb-3"
          >
            Save and Enable
          </button>
          <button
            onClick={() => {
              setShowApiSetup(false);
              if (aiMode !== 'real') {
                setAiMode('mock');
              }
            }}
            className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded font-semibold mb-3"
          >
            Cancel
          </button>
          <button
            onClick={clearAllApiKeys}
            className="w-full bg-red-600/20 hover:bg-red-600/30 border border-red-600 text-red-400 px-4 py-2 rounded font-semibold text-sm"
          >
            Clear All Saved Keys
          </button>

          <div className="mt-4 p-4 bg-gray-700 rounded">
            <p className="text-sm text-gray-300 mb-2">
              <strong>{AI_PROVIDERS[aiProvider].name}</strong>
            </p>
            <p className="text-xs text-gray-400 mb-1">
              {AI_PROVIDERS[aiProvider].setup}
            </p>
            <p className="text-xs text-green-400">
              {AI_PROVIDERS[aiProvider].cost}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">Help Desk Ticketing Simulator</h1>
            <p className="text-gray-400">Practice your IT support skills with AI-powered customers</p>
          </div>
          <div className="flex gap-2">
            {aiMode === 'mock' ? (
              <button
                onClick={switchToRealAI}
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-yellow-700 hover:to-blue-700 px-4 py-2 rounded font-semibold"
              >
                <Sparkles className="w-4 h-4" />
                Upgrade to Real AI
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-green-600/20 border border-green-600 px-4 py-2 rounded">
                  <Zap className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-semibold">
                    {AI_PROVIDERS[aiProvider].name}
                  </span>
                </div>
                <button
                  onClick={() => setShowApiSetup(true)}
                  className="text-sm text-blue-400 hover:text-blue-300 px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded"
                >
                  Change Provider
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mb-4 bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold mb-1">
                Current Mode: {aiMode === 'mock' ? 'Practice Mode (Free)' : `Real AI Mode - ${AI_PROVIDERS[aiProvider].name}`}
              </h3>
              <p className="text-sm text-gray-400">
                {aiMode === 'mock'
                  ? '🎯 Using pre-written responses. Great for practice! No API key needed.'
                  : `✨ Using ${AI_PROVIDERS[aiProvider].name} (${aiModel}) for realistic conversations.`}
              </p>
            </div>
            <div className="flex gap-2">
              {aiMode === 'real' && (
                <>
                  <button
                    onClick={() => setShowApiSetup(true)}
                    className="text-sm text-blue-400 hover:text-blue-300 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded"
                  >
                    Switch Provider
                  </button>
                  <button
                    onClick={() => setAiMode('mock')}
                    className="text-sm text-gray-400 hover:text-gray-300 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded"
                  >
                    Switch to Practice
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {view === 'menu' && (
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="text-yellow-400" />
                Active Tickets ({activeTickets.length})
              </h2>
              {activeTickets.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">No active tickets</p>
                  <button
                    onClick={generateTickets}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                  >
                    Generate New Tickets
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {activeTickets.map(ticket => (
                    <div
                      key={ticket.id}
                      onClick={() => openTicket(ticket)}
                      className="bg-gray-700 p-4 rounded cursor-pointer hover:bg-gray-600 transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-mono text-sm text-gray-400">{ticket.id}</span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${ticket.priority === 'high' ? 'bg-red-600' :
                          ticket.priority === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                          }`}>
                          {ticket.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className="font-semibold mb-1">{ticket.user}, {ticket.age}</p>
                      <p className="text-gray-300 text-sm">{ticket.issue}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-400" />
                Closed Tickets ({closedTickets.length})
              </h2>
              {closedTickets.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No closed tickets yet</p>
              ) : (
                <div className="space-y-3">
                  {closedTickets.map(ticket => (
                    <div key={ticket.id} className="bg-gray-700 p-4 rounded">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-mono text-sm text-gray-400">{ticket.id}</span>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < ticket.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="font-semibold mb-1">{ticket.user}</p>
                      <p className="text-gray-400 text-sm mb-2">{ticket.feedback}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'chat' && currentTicket && (
          <div className="bg-gray-800 rounded-lg border border-gray-700 h-[600px] flex flex-col">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <div>
                <h2 className="font-semibold flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {currentTicket.user} - {currentTicket.id}
                </h2>
                <p className="text-sm text-gray-400">{currentTicket.issue}</p>
              </div>
              <button
                onClick={() => setView('menu')}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
              >
                Back
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversation.map((msg, idx) => (
                <div key={idx} className={`${msg.role === 'system' ? 'bg-blue-900/30 p-3 rounded border border-blue-700' : ''}`}>
                  {msg.role === 'system' ? (
                    <p className="text-sm whitespace-pre-line">{msg.content}</p>
                  ) : (
                    <div className={`flex ${msg.role === 'agent' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'agent' ? 'bg-blue-600' : 'bg-gray-700'
                        }`}>
                        <p className="text-sm font-semibold mb-1">
                          {msg.role === 'agent' ? 'You' : currentTicket.user}
                        </p>
                        <p>{msg.content}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <p className="text-sm font-semibold mb-1">{currentTicket.user}</p>
                    <p className="text-gray-400">Typing...</p>
                  </div>
                </div>
              )}
              {ticketClosed && rating && (
                <div className="bg-green-900/30 p-4 rounded-lg border border-green-700">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="text-green-400" />
                    Ticket Closed
                  </h3>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < rating.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                      />
                    ))}
                    <span className="ml-2 font-semibold">{rating.rating}/5</span>
                  </div>
                  <p className="text-sm">{rating.feedback}</p>
                </div>
              )}
            </div>

            {!ticketClosed && (
              <div className="p-4 border-t border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your response..."
                    className="flex-1 bg-gray-700 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-pink-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={loading || !userInput.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 py-2 rounded font-semibold"
                  >
                    Send
                  </button>
                  <button
                    onClick={closeTicketManually}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                  >
                    Close Ticket
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
