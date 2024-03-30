# Project Structure

project-root/ <br>
├── src/<br>
│   ├── app/<br>
│   │   ├── components/<br>
│   │   │   └── ...    # Other components<br>
│   │   ├── services/ <br>
│   │   │   └── ...    # Other services<br>
│   │   └── ...<br>
│   │<br>
│   ├── assets/<br>
│   │   └── ...        # Static assets like images, styles, etc.<br>
│   │<br>
│   ├── environments/<br>
│   │   ├── environment.ts<br>
│   │   ├── environment.prod.ts<br>
│   │   └── ...<br>
│   │<br>
│   └── sl-auth-library/<br>
│       ├── src/<br>
│       │   ├── lib/<br>
│       │   │   ├── components/<br>
│       │   │   │   └── ...    # Authentication components<br>
│       │   │   ├── services/<br>
│       │   │   │   └── ...    # Authentication services<br>
│       │   │   └── ...<br>
│       │   ├── public_api.ts   # Exported components and services<br>
│       │   └── ...
│       └── ...<br>
│<br>
├── angular.json<br>
├── package.json<br>
└── ...<br>
