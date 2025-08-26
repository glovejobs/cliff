# Security Guidelines

## 🚨 CRITICAL: Environment Variables & Secrets

### ❌ NEVER COMMIT:
- `.env` files with real values
- API keys, passwords, tokens
- Database credentials
- Private keys or certificates
- Any sensitive configuration

### ✅ SECURE PRACTICES:

#### Development:
1. **Use `.env.example`** - Template with placeholder values (safe to commit)
2. **Copy to `.env`** - Add real values locally (never commit)
3. **Use DevServerControl** - For secrets in development environment:
   ```javascript
   // Use the DevServerControl tool instead of .env for secrets
   DevServerControl.set_env_variable(["API_KEY", "your_secret_key"]);
   ```

#### Production:
- **Netlify**: Set environment variables in site settings
- **Vercel**: Use environment variables in project settings
- **Never** hardcode secrets in source code

#### Frontend vs Backend Variables:
- **Frontend (Vite)**: Prefix with `VITE_PUBLIC_` (exposed to browser)
- **Backend**: No prefix needed (server-side only)

### 🔒 Git Security:

#### .gitignore Rules:
```gitignore
# Environment files
.env
.env.*
*.env
*.env.*

# Secrets and keys
*.key
*.pem
secrets/
config/secrets.json
```

#### If .env was already committed:
1. Remove from tracking: `git rm --cached .env`
2. Add to .gitignore
3. Rotate any exposed secrets immediately
4. Consider using `git filter-branch` to remove from history

### 🛡️ Code Review Checklist:
- [ ] No hardcoded API keys or passwords
- [ ] No .env files in commits
- [ ] Secrets use environment variables
- [ ] Public variables properly prefixed
- [ ] .env.example updated with new variables

### 🚨 If Secrets Are Exposed:
1. **Immediately rotate** all exposed credentials
2. **Remove from git history** if necessary
3. **Update all environments** with new secrets
4. **Review access logs** for unauthorized usage

### 📚 Resources:
- [Builder.io API Keys](https://www.builder.io/c/docs/using-your-api-key)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Git Secrets Prevention](https://git-scm.com/book/en/v2/Git-Tools-Credential-Storage)
